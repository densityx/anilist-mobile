import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import {IconInfoCircle} from "tabler-icons-react-native";
import {retrieveData} from '../services/userFavoriteSingleQuery';
import {LinearGradient} from "expo-linear-gradient";
import LoadingScreen from "../components/Common/LoadingScreen";
import AnimeCardHorizontal from "../components/Anime/AnimeCardHorizontal";
import MangaCardHorizontal from "../components/Manga/MangaCardHorizontal";
import AnimeShow from "./AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import MangaShow from "./MangaShow";

const FavoriteListComponent = () => {
    const scheme = 'dark';
    const tailwind = useTailwind();
    const [loading, setLoading] = useState(false);
    const [favoriteAnime, setFavoriteAnime] = useState([]);
    const [favoriteManga, setFavoriteManga] = useState([]);
    const navigation = useNavigation();

    const getUser = useCallback(async () => {
        setLoading(true)
        let {data} = await retrieveData();

        console.log('data anime:', data.User.favourites.anime.edges);
        console.log('data manga:', data.User.favourites.manga.edges);
        setFavoriteAnime(data.User.favourites.anime.edges)
        setFavoriteManga(data.User.favourites.manga.edges)

        // console.log('genres', favoriteAnime[0]?.node?.genres);
        // setFavoriteAnime(data)
        // setFavoriteManga(data)
        setLoading(false);
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    return loading
        ? <LoadingScreen/>
        : (
            <ScrollView>
                <SafeAreaView style={tailwind('p-4')}>
                    <Card styles={'flex items-center justify-center bg-zinc-800 rounded-xl'}>
                        <IconInfoCircle
                            size={64}
                            color={scheme === 'dark' ? '#f4f4f5' : '#52525b'}
                        />

                        <Text style={tailwind('mt-3 text-center text-zinc-800 dark:text-zinc-400 text-lg')}>
                            You have to authenticate to see this page
                        </Text>
                    </Card>

                    <Card styles={'mt-4'}>
                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                            All Favorite Anime
                        </Text>

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
                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                            All Favorite Manga
                        </Text>

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
                </SafeAreaView>
            </ScrollView>
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
                options={({route}) => ({title: route.params.animeName})}
                // options={({route}) => ({headerTitle: route.params.animeName})}
            />
            <FavoriteStack.Screen
                name={'MangaShow'}
                component={MangaShow}
                // options={({route}) => ({headerTitle: route.params.mangaName})}
            />
        </FavoriteStack.Navigator>
    );


}