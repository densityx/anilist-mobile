import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Pressable,
    useWindowDimensions,
    TouchableOpacity
} from "react-native";
import {retrieveData} from "../services/singleQuery";
import {useTailwind} from "tailwind-rn";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import Svg, {Path} from "react-native-svg";
import Card from "../components/Common/Card";
import RenderHtml from 'react-native-render-html';
import LoadingScreen from "../components/Common/LoadingScreen";

export default function AnimeShow({route}) {
    const tailwind = useTailwind();
    const {animeId} = route.params;
    const navigation = useNavigation();
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);
    const {width} = useWindowDimensions();
    const [descriptionExpand, setDescriptionExpand] = useState(false);

    let getData = useCallback(async () => {
        let {data: {Media}} = await retrieveData(animeId);
        console.log(Media.description);
        // console.log(Media.recommendations.edges[0]);
        // let Media = {
        //     "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/25191.jpg"},
        //     "id": 55191,
        //     "title": {"english": null, "native": "Fate/Zero", "romaji": "Fate/Zero"}
        // };

        setAnime(Media);
    }, []);

    useEffect(() => {
        getData().then(() => setLoading(false));
    }, [getData]);

    return loading
        ? <LoadingScreen/>
        : (
            <ScrollView>
                <SafeAreaView>
                    <View style={tailwind('relative flex items-center justify-center')}>
                        <Image
                            source={{
                                uri: anime?.coverImage?.large
                            }}
                            style={tailwind('h-[320px] w-full')}
                        />

                        <LinearGradient
                            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
                            style={tailwind('absolute top-0 right-0 left-0 h-full')}
                        />

                        <View style={tailwind('flex flex-row absolute top-0 right-0 mt-4 mr-4')}>
                            <Pressable
                                onPress={() => {
                                }}
                                style={tailwind('flex flex-row items-center mr-2 p-2 rounded-xl bg-zinc-900/50')}
                            >
                                <Svg style={tailwind('w-5 h-5 text-yellow-400')} viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor"
                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                                    <Path
                                        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></Path>
                                </Svg>

                                <Text style={tailwind('ml-2 text-yellow-400 font-semibold')}>
                                    {anime.trending}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                }}
                                style={tailwind('flex flex-row items-center p-2 rounded-xl bg-zinc-900/50')}
                            >
                                <Svg style={tailwind('w-5 h-5 text-pink-400')} viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor"
                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <Path
                                        d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                                </Svg>

                                <Text style={tailwind('ml-2 text-pink-400 font-semibold')}>
                                    {anime.favourites}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={tailwind('-mt-[80px] p-4')}>
                        <Card styles={'mt-3'}>
                            <Text style={tailwind('text-xl text-teal-500 font-semibold')}>
                                {anime?.title?.romaji}
                            </Text>

                            <View style={tailwind('mt-3')}>
                                <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                    Genres
                                </Text>

                                <ScrollView horizontal={true} style={tailwind('mt-2')}>
                                    {anime.genres.map((genre, index) => (
                                        <Text
                                            key={index}
                                            style={tailwind('p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-sm mr-3 border-2 border-zinc-800 dark:border-zinc-400')}
                                        >
                                            {genre}
                                        </Text>
                                    ))}

                                    {/*{!!anime?.title?.english &&*/}
                                    {/*    <Text style={tailwind('p-2 rounded-xl bg-teal-400 text-white text-sm mr-3')}>*/}
                                    {/*        {anime?.title?.english}*/}
                                    {/*    </Text>*/}
                                    {/*}*/}

                                    {/*{!!anime?.title?.native &&*/}
                                    {/*    <Text style={tailwind('p-2 rounded-xl bg-teal-400 text-white text-sm mr-3')}>*/}
                                    {/*        {anime?.title?.native}*/}
                                    {/*    </Text>*/}
                                    {/*}*/}
                                </ScrollView>
                            </View>

                            {!!anime?.description && (
                                <View
                                    style={tailwind(`relative flex mt-4 mb-4 text-white ${descriptionExpand ? 'h-auto' : 'h-[60px]'}`)}
                                >
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{html: anime?.description}}
                                        tagsStyles={{
                                            body: {
                                                color: '#a1a1aa',
                                            }
                                        }}
                                    />

                                    {!descriptionExpand && (
                                        <Pressable
                                            style={tailwind('flex mt-2')}
                                            onPress={() => setDescriptionExpand(true)}
                                        >
                                            <Text style={tailwind('text-zinc-800 dark:text-white')}>
                                                More...
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                            )}

                            {!!anime?.trailer?.thumbnail &&
                                <View style={tailwind('mt-4')}>
                                    <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                        Trailer
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                        }}
                                        style={tailwind('relative flex items-center justify-center mt-2 rounded-lg overflow-hidden')}
                                    >
                                        <Image
                                            source={{
                                                uri: anime?.trailer?.thumbnail
                                            }}
                                            style={tailwind('w-full h-[160px]')}
                                        />

                                        <View
                                            style={tailwind('absolute bg-zinc-400 w-full h-[160px] opacity-40')}
                                        />

                                        <View style={tailwind('absolute p-2 rounded-full bg-zinc-900/40')}>
                                            <Svg
                                                style={tailwind('w-6 h-6 text-red-400')}
                                                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                                                <Path d="M7 4v16l13 -8z"></Path>
                                            </Svg>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={tailwind('flex flex-row flex-wrap mt-4')}>
                                {!!anime?.episodes &&
                                    <View style={tailwind('mt-4 w-1/2')}>
                                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                            Episodes
                                        </Text>

                                        <Text style={tailwind('mt-2 font-medium text-zinc-800 dark:text-zinc-400')}>
                                            {anime?.episodes}
                                        </Text>
                                    </View>
                                }

                                {!!anime?.duration &&
                                    <View style={tailwind('mt-4 w-1/2')}>
                                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                            Duration
                                        </Text>

                                        <Text style={tailwind('mt-2 font-medium text-zinc-800 dark:text-zinc-400')}>
                                            {anime?.duration} mins
                                        </Text>
                                    </View>
                                }

                                {!!anime?.startDate?.day &&
                                    <View style={tailwind('mt-4 w-1/2')}>
                                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                            Start Date
                                        </Text>

                                        <Text style={tailwind('mt-2 font-medium text-zinc-800 dark:text-zinc-400')}>
                                            {anime?.startDate?.day} / {anime?.startDate?.month} / {anime?.startDate?.year}
                                        </Text>
                                    </View>
                                }

                                {!!anime?.endDate?.day &&
                                    <View style={tailwind('mt-4 w-1/2')}>
                                        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                            End Date
                                        </Text>

                                        <Text style={tailwind('mt-2 font-medium text-zinc-800 dark:text-zinc-400')}>
                                            {anime?.endDate?.day} / {anime?.endDate?.month} / {anime?.endDate?.year}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </Card>

                        <Card styles={'mt-3'}>
                            <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                Other Adaptation
                            </Text>

                            <ScrollView horizontal={true} style={tailwind('mt-3')}>
                                {anime.relations.nodes.map(other => (
                                    <Pressable
                                        key={other?.id}
                                        style={tailwind('relative mr-2 rounded-lg overflow-hidden w-[120px]')}
                                        onPress={() => {
                                            navigation.goBack();

                                            navigation.navigate('AnimeShow', {
                                                animeId: other?.id,
                                            })
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: other?.coverImage?.large
                                            }}
                                            style={tailwind('h-[180px] w-full')}
                                        />

                                        <LinearGradient
                                            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                                            style={tailwind('absolute top-0 right-0 left-0 h-full')}
                                        />

                                        <View
                                            style={tailwind('absolute flex justify-end bottom-0 left-0 h-[54px] p-2')}>
                                            <Text
                                                style={tailwind('mt-2 font-medium text-white')}>{other?.title?.romaji}</Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </Card>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
}