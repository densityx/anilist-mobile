import React, {useCallback, useEffect, useState} from "react";
import {Image, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View} from "react-native";
import {retrieveData} from "../services/singleQuery";
import {useTailwind} from "tailwind-rn";
import {LinearGradient} from "expo-linear-gradient";
import Card from "../components/Common/Card";
import LoadingScreen from "../components/Common/LoadingScreen";
import AnimeTrailer from "../components/Anime/AnimeTrailer";
import Tag from "../components/Common/Tag";
import OtherAdaptationCard from "../components/Common/OtherAdaptationCard";
import DataDetail from "../components/Common/DataDetail";
import Label from "../components/Common/Label";
import {useUserStore} from "../store/zustand";
import {retrieveUserQuery} from "../services/retrieveUserQuery";
import {IconHeart, IconStar} from "tabler-icons-react-native";
import DataDescription from "../components/Common/DataDescription";

export default function AnimeShow({route}): React.ReactElement {
    const tailwind = useTailwind();
    const {animeId} = route.params;
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);
    const userToken = useUserStore(state => state.token);
    const [userDetails, setUserDetails] = useState({});

    let getData = useCallback(async () => {
        setLoading(true);
        let {data: {Media}} = await retrieveData(animeId, 'ANIME', userToken);
        setAnime(Media);

        if (userToken) {
            let {data} = await retrieveUserQuery(userToken);
            setUserDetails(data);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        getData().then(() => setLoading(false));
    }, [getData]);

    return loading
        ? <LoadingScreen/>
        : (
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={getData}
                        />
                    }
                >
                    <View style={tailwind('relative flex items-center justify-center')}>
                        <Image
                            source={{
                                uri: anime?.bannerImage
                            }}
                            style={tailwind('h-[320px] w-full')}
                        />

                        <LinearGradient
                            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
                            style={tailwind('absolute top-0 right-0 left-0 h-full')}
                        />

                        <View style={tailwind('absolute flex items-center top-0 mt-[60px]')}>
                            <Image
                                source={{
                                    uri: anime?.coverImage?.large
                                }}
                                style={tailwind('h-[160px] w-[120px] rounded-lg overflow-hidden')}
                            />

                            <View
                                style={tailwind('absolute bottom-0 mb-1 flex flex-row items-center p-1 rounded-xl bg-yellow-900/50')}
                            >
                                <IconStar color={'#facc15'} size={16}/>

                                <Text style={tailwind('ml-1 text-yellow-400 font-semibold')}>
                                    {anime.trending}
                                </Text>
                            </View>
                        </View>

                        <View style={tailwind('flex flex-row absolute top-0 right-0 mt-4 mr-4')}>
                            <Pressable
                                onPress={() => {
                                }}
                                style={tailwind(`flex flex-row items-center p-2 rounded-xl ${userToken && userDetails.Viewer.favourites.anime.nodes.find(a => a.id === anime.id) ? 'bg-pink-900/50' : 'bg-white/50'}`)}
                            >
                                <IconHeart
                                    color={userToken && userDetails.Viewer.favourites.anime.nodes.find(a => a.id === anime.id) ? '#f472b6' : '#fff'}
                                    size={16}/>

                                <Text
                                    style={tailwind(`ml-2 font-semibold ${userToken && userDetails.Viewer.favourites.anime.nodes.find(a => a.id === anime.id) ? 'text-pink-400' : 'text-white'}`)}>
                                    {anime.favourites}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={tailwind('-mt-[80px] p-4')}>
                        <Card styles={'mt-3'}>
                            <Text style={tailwind('text-xl text-teal-500 font-semibold')}>
                                {anime?.title?.userPreferred}
                            </Text>

                            <View style={tailwind('mt-3')}>
                                <Label>
                                    Genres
                                </Label>

                                <ScrollView horizontal={true} style={tailwind('mt-2')}>
                                    {anime.genres.map((genre, index) => (
                                        <Tag genre={genre} key={index} style={'mr-2'}/>
                                    ))}
                                </ScrollView>
                            </View>

                            <DataDescription media={anime}/>

                            {!loading && <AnimeTrailer anime={anime}/>}

                            <View style={tailwind('flex flex-row flex-wrap mt-4')}>

                                <DataDetail
                                    hasMedia={!!anime?.episodes}
                                    name={'Episodes'}
                                    value={anime?.episodes}
                                />

                                <DataDetail
                                    hasMedia={!!anime?.duration}
                                    name={'Duration'}
                                    value={anime?.duration + ' mins'}
                                />

                                <DataDetail
                                    hasMedia={!!anime?.startDate?.day}
                                    name={'Start Date'}
                                    value={anime?.startDate?.day + '/' + anime?.startDate?.month + '/' + anime?.startDate?.year}
                                />

                                <DataDetail
                                    hasMedia={!!anime?.endDate?.day}
                                    name={'Start Date'}
                                    value={anime?.endDate?.day + '/' + anime?.endDate?.month + '/' + anime?.endDate?.year}
                                />
                            </View>
                        </Card>

                        <Card styles={'mt-3'}>
                            <Label>
                                Other Adaptation
                            </Label>

                            <ScrollView horizontal={true} style={tailwind('mt-3')}>
                                {anime?.relations?.nodes?.map(anime => (
                                    <OtherAdaptationCard key={anime?.id} anime={anime}/>
                                ))}
                            </ScrollView>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
}