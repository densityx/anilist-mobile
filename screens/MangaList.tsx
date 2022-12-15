import {ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {retrieveData} from "../services/paginatedQueryManga";
import {useTailwind} from "tailwind-rn";
import MangaCard from "../components/Manga/MangaCard";
import MangaShow from "./MangaShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDebouncedValue} from "@mantine/hooks";
import {IconSearch} from "tabler-icons-react-native";
import LoadingScreen from "../components/Common/LoadingScreen";
import Card from "../components/Common/Card";
import {useUserStore} from "../store/zustand";

const MangaListScreen = () => {
    let theme = useUserStore(state => state.theme);

    const tailwind = useTailwind();
    const [term, setTerm] = useState('')
    const [debounced] = useDebouncedValue(term, 500);

    const [loading, setLoading] = useState(true);
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false)

    let retrieveManga = useCallback(async () => {
        setLoading(true);
        setPage(1)
        let {
            data: {
                Page: {media: retrievedManga, pageInfo: {hasNextPage}},
                trending: {
                    media: seasonalManga,
                    pageInfo: {hasNextPage: hasNextTrending}
                },
            }
        } = await retrieveData(debounced, 1, 'MANGA')

        console.log('seasonalManga manga: ', JSON.stringify(seasonalManga, null, 4));

        if (term.length) {
            setMangas(retrievedManga);
            setHasNextPage(hasNextPage);
        } else {
            setMangas(seasonalManga);
            setHasNextPage(hasNextTrending)
        }

        setLoading(false);
    }, [debounced]);

    const retrieveMangaOnPageChange = useCallback(async () => {
        let {
            data: {
                Page: {media: retrievedManga, pageInfo: {hasNextPage}},
                trending: {
                    media: seasonalManga,
                    pageInfo: {hasNextPage: hasNextTrending}
                },
            }
        } = await retrieveData(debounced, page, 'MANGA')

        console.log('season', seasonalManga)

        if (term.length) {
            setMangas([...mangas, ...retrievedManga]);
            setHasNextPage(hasNextPage);
        } else {
            setMangas([...mangas, ...seasonalManga]);
            setHasNextPage(hasNextTrending);
        }
    }, [page]);

    useEffect(() => {
        if (page !== 1) {
            retrieveMangaOnPageChange();
        }

    }, [retrieveMangaOnPageChange, page]);

    useEffect(() => {
        retrieveManga();
    }, [retrieveManga, debounced]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={tailwind('relative flex justify-center p-4')}>
                <TextInput
                    style={tailwind('pl-8 pr-4 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-white')}
                    placeholder={'Search manga...'}
                    value={term}
                    onChangeText={(text) => setTerm(text)}
                    placeholderTextColor={theme === 'dark' ? '#a1a1aa' : '#27272a'}
                />

                <IconSearch
                    color={theme === 'dark' ? '#52525b' : '#a1a1aa'}
                    style={tailwind('absolute ml-6')}
                    size={16}
                />
            </View>

            {loading
                ? <LoadingScreen/>
                : (
                    <FlatList
                        contentContainerStyle={{flexGrow: 1}}
                        data={mangas}
                        renderItem={({item}) => <MangaCard manga={item}/>}
                        keyExtractor={(manga, index) => index.toString()}
                        numColumns={2}
                        refreshing={loading}
                        onRefresh={retrieveManga}
                        ListEmptyComponent={() => (
                            <View style={tailwind('p-4')}>
                                <Card styles={'px-4'}>
                                    <Text style={tailwind('font-bold text-center text-lg dark:text-teal-500')}>
                                        Search manga and get the result here...
                                    </Text>
                                </Card>
                            </View>
                        )}
                        ListFooterComponent={() => hasNextPage && (
                            <ActivityIndicator
                                style={tailwind('h-[100px]')}
                                size="large"
                                color={'#14b8a6'}
                            />
                        )}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => hasNextPage && setPage(page + 1)}
                    />
                )}
        </SafeAreaView>
    )
}

export default function MangaList() {
    const MangaListStack = createNativeStackNavigator();

    return (
        <MangaListStack.Navigator>
            <MangaListStack.Screen
                name={'MangaListScreen'}
                component={MangaListScreen}
                options={{title: 'Manga List'}}
            />
            <MangaListStack.Screen
                name={'MangaShow'}
                component={MangaShow}
                options={({route}) => ({title: route.params.mangaName})}
            />
        </MangaListStack.Navigator>
    )
}