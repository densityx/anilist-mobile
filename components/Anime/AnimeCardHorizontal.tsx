import {Image, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useTailwind} from "tailwind-rn";
import Tag from "../Common/Tag";

export default function AnimeCardHorizontal({anime}) {
    const navigation = useNavigation();
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            key={anime?.node?.id}
            onPress={() => {
                navigation.navigate('AnimeShow', {
                    animeId: anime?.node?.id,
                    animeName: anime?.node?.title?.userPreferred
                });
            }}
        >
            <View style={tailwind('flex flex-row flex-wrap w-full mt-4')}>
                <View
                    style={tailwind('relative flex items-center justify-center w-1/4 bg-white dark:bg-zinc-700 rounded-lg overflow-hidden')}
                >
                    <Image
                        source={{
                            uri: anime.node.coverImage.large
                        }}
                        style={tailwind('h-[160px] w-full')}
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                        style={tailwind('absolute bottom-0 right-0 left-0 h-full')}
                    />
                </View>

                <View style={tailwind('w-3/4 bottom-0 left-0 pl-4')}>
                    <Text style={tailwind('text-lg text-zinc-800 dark:text-teal-500 font-medium')}>
                        {anime?.node?.title?.userPreferred}
                    </Text>

                    <View
                        style={tailwind('flex flex-row flex-wrap w-full')}
                    >
                        {anime?.node?.genres?.map((genre, index) => (
                            <Tag genre={genre} key={index} style={'mr-2 mt-2'}/>
                        ))}
                    </View>

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
            </View>
        </TouchableOpacity>
    )
}