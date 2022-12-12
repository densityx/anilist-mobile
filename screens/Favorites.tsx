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
                                <AnimeCardHorizontal
                                    key={anime?.node?.id}
                                    anime={anime}
                                />
                            ))}
                        </View>
                    </Card>
                </SafeAreaView>
            </ScrollView>
        )
}