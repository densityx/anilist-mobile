import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, Image, ScrollView} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import {IconInfoCircle} from "tabler-icons-react-native";
import {retrieveData} from '../services/userFavoriteSingleQuery';
import {LinearGradient} from "expo-linear-gradient";
import LoadingScreen from "../components/Common/LoadingScreen";

const data = [{
    "favouriteOrder": 2000,
    "node": {
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-lf01ya5ny8aH.jpg",
        "coverImage": [Object],
        "format": "TV",
        "id": 127230,
        "isAdult": false,
        "startDate": [Object],
        "status": "RELEASING",
        "title": [Object],
        "type": "ANIME"
    }
}, {
    "favouriteOrder": 2000,
    "node": {
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
        "coverImage": [Object],
        "format": "TV",
        "id": 101922,
        "isAdult": false,
        "startDate": [Object],
        "status": "FINISHED",
        "title": [Object],
        "type": "ANIME"
    }
}];

export default function Settings({navigation}) {
    const scheme = 'dark';
    const tailwind = useTailwind();
    const [loading, setLoading] = useState(false);
    const [favoriteAnime, setFavoriteAnime] = useState([]);
    const [favoriteManga, setFavoriteManga] = useState([]);

    const getUser = useCallback(async () => {
        setLoading(true)
        let {data} = await retrieveData();

        console.log('data:', data.User.favourites.anime.edges);
        setFavoriteAnime(data.User.favourites.anime.edges)
        setFavoriteManga(data.User.favourites.manga.edges)

        console.log('genres', favoriteAnime[0]?.node?.genres);
        // setFavoriteAnime(data)
        // setFavoriteManga(data)
        setLoading(false);
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    const handlePress = () => {
        navigation.navigate('AnimeList');
    }

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

                        <View>
                            {favoriteAnime?.map(anime => (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate('AnimeList', {
                                            screen: 'AnimeShow',
                                            params: {
                                                animeId: anime?.node?.id
                                            },
                                        });
                                    }}
                                    key={anime?.node?.id}
                                    style={tailwind('flex flex-row flex-wrap w-full mt-4')}
                                >
                                    <View style={tailwind('w-1/4 bg-white rounded-lg overflow-hidden')}>
                                        <Image
                                            source={{
                                                uri: anime.node.coverImage.large
                                            }}
                                            style={tailwind('h-[120px] w-full')}
                                        />

                                        <LinearGradient
                                            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                                            style={tailwind('absolute top-0 right-0 left-0 h-full')}
                                        />
                                    </View>

                                    <View style={tailwind('w-3/4 bottom-0 left-0 pl-4')}>
                                        <Text style={tailwind('text-lg text-zinc-200 font-medium')}>
                                            {anime?.node?.title?.userPreferred}
                                        </Text>

                                        <ScrollView horizontal={true}
                                                    style={tailwind('mt-2 w-full')}>
                                            {anime?.node?.genres?.map((genre, index) => (
                                                <Text
                                                    key={index}
                                                    style={tailwind('px-2 py-1 h-[28px] rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-sm mr-3 border border-zinc-800 dark:border-zinc-400')}
                                                >
                                                    {genre}
                                                </Text>
                                            ))}
                                        </ScrollView>

                                        <View style={tailwind('flex flex-row flex-wrap w-full')}>
                                            {!!anime?.node?.duration &&
                                                <View style={tailwind('mt-2 w-1/2')}>
                                                    <Text
                                                        style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                                    >
                                                        Duration: {anime?.node?.duration} mins
                                                    </Text>
                                                </View>
                                            }

                                            {!!anime?.node?.episodes &&
                                                <View style={tailwind('mt-2 w-1/2')}>
                                                    <Text
                                                        style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                                    >
                                                        Ep: {anime?.node?.episodes} episodes
                                                    </Text>
                                                </View>
                                            }

                                            {!!anime?.node?.trending &&
                                                <View style={tailwind('mt-2 w-1/2')}>
                                                    <Text
                                                        style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                                    >
                                                        Trending: #{anime?.node?.trending}
                                                    </Text>
                                                </View>
                                            }

                                            {!!anime?.node?.favourites &&
                                                <View style={tailwind('mt-2 w-1/2')}>
                                                    <Text
                                                        style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                                    >
                                                        Fav: {anime?.node?.favourites}
                                                    </Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </Card>
                </SafeAreaView>
            </ScrollView>
        )
}