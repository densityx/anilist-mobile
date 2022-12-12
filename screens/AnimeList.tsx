import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Pressable,
    useColorScheme,
    Appearance, ActivityIndicator, FlatList
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useState} from "react";
import {retrieveData} from "../services/paginatedQuery";
import {useTailwind} from "tailwind-rn";
import AnimeCard from "../components/Anime/AnimeCard";
import {NavigationContainer} from "@react-navigation/native";
import AnimeShow from "./AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDebouncedValue} from "@mantine/hooks";
import Svg, {Circle, Line, Path} from "react-native-svg";
import getColorScheme = Appearance.getColorScheme;
import {IconSearch} from "tabler-icons-react-native";
import LoadingScreen from "../components/Common/LoadingScreen";
import Card from "../components/Common/Card";

const renderAnimeItem = ({item}) => {
    // console.log('renderAnimeItem: ', item);
    return <AnimeCard anime={item}/>
}

const AnimeListComponent = ({navigation}) => {
    let scheme = 'dark';

    const tailwind = useTailwind();
    const [term, setTerm] = useState('one piece')
    const [debounced] = useDebouncedValue(term, 500);

    const [loading, setLoading] = useState(true);
    const [animes, setAnimes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false)

    let retrieveAnime = useCallback(async () => {
        setPage(1)
        let {data: {Page: {media: retrievedAnime, pageInfo: {hasNextPage}}}} = await retrieveData(debounced, 1)
        setAnimes(retrievedAnime);
        setLoading(false);
        setHasNextPage(hasNextPage);
    }, [debounced]);

    const retrieveAnimeOnPageChange = useCallback(async () => {
        let {data: {Page: {media: retrievedAnime, pageInfo: {hasNextPage}}}} = await retrieveData(debounced, page)
        setAnimes([...animes, ...retrievedAnime]);
        setHasNextPage(hasNextPage);
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
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <View style={tailwind('relative flex justify-center p-4')}>
                    <TextInput
                        style={tailwind('pl-8 pr-4 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-white')}
                        placeholder={'Search anime...'}
                        value={term}
                        onChangeText={(text) => setTerm(text)}
                        placeholderTextColor={scheme === 'dark' ? '#a1a1aa' : '#27272a'}
                    />

                    <IconSearch
                        color={scheme === 'dark' ? '#f4f4f5' : '#52525b'}
                        style={tailwind('absolute ml-6')}
                        size={16}
                    />
                </View>

                {loading
                    ? <LoadingScreen/>
                    : (
                        <FlatList
                            contentContainerStyle={{flexGrow: 1}}
                            data={animes}
                            renderItem={renderAnimeItem}
                            keyExtractor={(anime, index) => index.toString()}
                            numColumns={2}
                            ListEmptyComponent={() => (
                                <View style={tailwind('p-4')}>
                                    <Card styles={'px-4'}>
                                        <Text style={tailwind('font-bold text-center text-lg dark:text-teal-500')}>
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
        </SafeAreaProvider>
    )
}

export default function AnimeList({navigation}) {
    const AnimeListStack = createNativeStackNavigator();

    return (
        <AnimeListStack.Navigator screenOptions={{headerShown: false}}>
            <AnimeListStack.Screen name={'AnimeListComponent'} component={AnimeListComponent}/>
            <AnimeListStack.Screen name={'AnimeShow'} component={AnimeShow}/>
        </AnimeListStack.Navigator>
    )
}