import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import {IconInfoCircle} from "tabler-icons-react-native";
import {retrieveData} from '../services/userFavoriteSingleQuery';
import LoadingScreen from "../components/Common/LoadingScreen";
import AnimeCardHorizontal from "../components/Anime/AnimeCardHorizontal";
import MangaCardHorizontal from "../components/Manga/MangaCardHorizontal";
import AnimeShow from "./AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import MangaShow from "./MangaShow";
import {useUserStore} from "../store/zustand";
import Label from '../components/Common/Label';

const FavoriteListComponent = () => {
    const tailwind = useTailwind();
    const navigator = useNavigation();
    const [loading, setLoading] = useState(false);
    const [favoriteAnime, setFavoriteAnime] = useState([]);
    const [favoriteManga, setFavoriteManga] = useState([]);
    const theme = useUserStore(state => state.theme);
    const userToken = useUserStore(state => state.token);

    const getFavorites = useCallback(async () => {
        setLoading(true)
        let {data} = await retrieveData(userToken);

        console.log('data anime:', data.User.favourites.anime.edges);
        console.log('data manga:', data.User.favourites.manga.edges);
        setFavoriteAnime(data.User.favourites.anime.edges)
        setFavoriteManga(data.User.favourites.manga.edges)
        setLoading(false);
    }, []);

    useEffect(() => {
        getFavorites();
    }, []);

    return loading
        ? <LoadingScreen/>
        : (
            <SafeAreaView style={tailwind('m-4')}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            colors={['#bada55']}
                            refreshing={loading}
                            onRefresh={getFavorites}
                        />
                    }
                >
                    {!userToken ? (
                        <Card styles={'flex items-center justify-center rounded-xl'}>
                            <IconInfoCircle
                                size={64}
                                color={theme === 'dark' ? '#52525b' : '#a1a1aa'}
                            />

                            <Text style={tailwind('mt-3 text-center text-zinc-800 dark:text-zinc-400 text-lg')}>
                                You have to authenticate to see this page
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigator.navigate('Account')}
                                style={tailwind('mt-4 p-3 w-full rounded-md bg-teal-500')}
                            >
                                <Text
                                    style={tailwind('text-white font-semibold text-center')}
                                >
                                    Authenticate
                                </Text>
                            </TouchableOpacity>
                        </Card>
                    ) : (
                        <>
                            <Card>
                                <Label>
                                    All Favorite Anime
                                </Label>

                                {favoriteAnime.length ? (
                                    <View>
                                        {favoriteAnime?.map(anime => (
                                            <AnimeCardHorizontal
                                                key={anime?.node?.id}
                                                anime={anime}
                                            />
                                        ))}
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={tailwind('mt-3 dark:text-zinc-400')}>
                                            You currently don't have any favourite anime list
                                        </Text>
                                    </View>
                                )}
                            </Card>

                            <Card styles={'mt-4'}>
                                <Label>
                                    All Favorite Manga
                                </Label>

                                {favoriteManga.length ? (
                                    <View>
                                        {favoriteManga?.map(manga => (
                                            <MangaCardHorizontal
                                                key={manga?.node?.id}
                                                manga={manga}
                                            />
                                        ))}
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={tailwind('mt-3 dark:text-zinc-400')}>
                                            You currently don't have any favourite manga list
                                        </Text>
                                    </View>
                                )}
                            </Card>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        )
}

export default function Favorites() {
    const FavoriteStack = createNativeStackNavigator();

    return (
        <FavoriteStack.Navigator initialRouteName={'FavoriteListComponent'}>
            <FavoriteStack.Screen
                name={'FavoriteListComponent'}
                component={FavoriteListComponent}
                options={{title: 'Favorites'}}
            />
            <FavoriteStack.Screen
                name={'AnimeShow'}
                component={AnimeShow}
                options={({route}) => ({
                    title: route.params.animeName,
                })}
            />
            <FavoriteStack.Screen
                name={'MangaShow'}
                component={MangaShow}
                options={({route}) => ({
                    title: route.params.mangaName,
                })}
            />
        </FavoriteStack.Navigator>
    );


}