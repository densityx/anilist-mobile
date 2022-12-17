import {ActivityIndicator, FlatList, SafeAreaView, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {retrieveData} from "../services/paginatedQueryManga";
import {useTailwind} from "tailwind-rn";
import MangaCard from "../components/Manga/MangaCard";
import MangaShow from "./MangaShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDebouncedValue} from "@mantine/hooks";
import LoadingScreen from "../components/Common/LoadingScreen";
import Card from "../components/Common/Card";
import InputSearch from "../components/Common/InputSearch";

const MangaListScreen = () => {
    const tailwind = useTailwind();
    const [term, setTerm] = useState('')
    const [debounced] = useDebouncedValue(term, 500);

    const [loading, setLoading] = useState(true);
    const [allManga, setMangas] = useState([]);
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

        if (term.length) {
            setMangas([...allManga, ...retrievedManga]);
            setHasNextPage(hasNextPage);
        } else {
            setMangas([...allManga, ...seasonalManga]);
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
            <View style={tailwind('p-4')}>
                <InputSearch
                    term={term}
                    onChangeText={(text) => setTerm(text)}
                    placeholder={'Search manga...'}
                />
            </View>

            {loading
                ? <LoadingScreen/>
                : (
                    <FlatList
                        contentContainerStyle={{flexGrow: 1}}
                        data={allManga}
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