import {ActivityIndicator, FlatList, SafeAreaView, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {retrieveData} from "../services/paginatedQuery";
import {useTailwind} from "tailwind-rn";
import AnimeCard from "../components/Anime/AnimeCard";
import AnimeShow from "./AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDebouncedValue} from "@mantine/hooks";
import LoadingScreen from "../components/Common/LoadingScreen";
import Card from "../components/Common/Card";
import InputSearch from "../components/Common/InputSearch";

const AnimeListComponent = (): React.ReactElement => {
    const tailwind = useTailwind();
    const [term, setTerm] = useState('')
    const [debounced] = useDebouncedValue(term, 500);

    const [loading, setLoading] = useState(true);
    const [allAnime, setAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false)

    let retrieveAnime = useCallback(async () => {
        setLoading(true);
        setPage(1)
        let {
            data: {
                Page: {media: retrievedAnime, pageInfo: {hasNextPage}},
                season: {media: seasonalAnime, pageInfo: {hasNextPage: hasNextSeasonPage}},
            }
        } = await retrieveData(debounced, 1, 'ANIME')

        if (term.length) {
            setAnimes(retrievedAnime);
            setHasNextPage(hasNextPage);
        } else {
            setAnimes(seasonalAnime);
            setHasNextPage(hasNextSeasonPage)
        }

        setLoading(false);
    }, [debounced]);

    const retrieveAnimeOnPageChange = useCallback(async () => {
        let {
            data: {
                Page: {media: retrievedAnime, pageInfo: {hasNextPage}},
                season: {media: seasonalAnime, pageInfo: {hasNextPage: hasNextSeasonPage}},
            }
        } = await retrieveData(debounced, page, 'ANIME')

        if (term.length) {
            setAnimes([...allAnime, ...retrievedAnime]);
            setHasNextPage(hasNextPage);
        } else {
            setAnimes([...allAnime, ...seasonalAnime]);
            setHasNextPage(hasNextSeasonPage);
        }
    }, [page]);

    useEffect(() => {
        if (page !== 1) {
            retrieveAnimeOnPageChange();
        }

    }, [retrieveAnimeOnPageChange, page]);

    useEffect(() => {
        retrieveAnime();
    }, [retrieveAnime, debounced]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={tailwind('p-4')}>
                <InputSearch
                    term={term}
                    onChangeText={(text) => setTerm(text)}
                    placeholder={'Search anime...'}
                />
            </View>

            {loading
                ? <LoadingScreen/>
                : (
                    <FlatList
                        contentContainerStyle={{flexGrow: 1}}
                        data={allAnime}
                        renderItem={({item}) => <AnimeCard anime={item}/>}
                        keyExtractor={(anime, index) => index.toString()}
                        numColumns={2}
                        refreshing={loading}
                        onRefresh={retrieveAnime}
                        ListEmptyComponent={() => (
                            <View style={tailwind('p-4')}>
                                <Card styles={'px-4'}>
                                    <Text
                                        style={tailwind('font-bold text-center text-lg text-zinc-800 dark:text-teal-500')}>
                                        Search anime and get the result here...
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

export default function AnimeList({navigation}) {
    const AnimeListStack = createNativeStackNavigator();

    return (
        <AnimeListStack.Navigator>
            <AnimeListStack.Screen
                name={'AnimeListComponent'}
                component={AnimeListComponent}
                options={{title: 'Anime List', headerTitle: 'Anime List'}}
            />

            <AnimeListStack.Screen
                name={'AnimeShow'}
                component={AnimeShow}
                options={({route}) => ({
                    title: route.params.animeName
                })}
            />
        </AnimeListStack.Navigator>
    )
}