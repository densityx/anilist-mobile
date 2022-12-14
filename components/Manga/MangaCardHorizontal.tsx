import {Image, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useTailwind} from "tailwind-rn";

export default function MangaCardHorizontal({manga}) {
    const navigation = useNavigation();
    const tailwind = useTailwind();

    console.log('manga data', manga.node.id);

    return (
        <TouchableOpacity
            key={manga?.node?.id}
            onPress={() => {
                console.log('manga', manga.id);
                navigation.navigate('MangaShow', {
                    mangaId: manga?.node?.id,
                    mangaName: manga?.node?.title?.userPreferred
                });
            }}
        >
            <View style={tailwind('flex flex-row flex-wrap w-full mt-4')}>
                <View
                    style={tailwind('relative flex items-center justify-center w-1/4 bg-white dark:bg-zinc-700 rounded-lg overflow-hidden')}
                >
                    <Image
                        source={{
                            uri: manga.node.coverImage.large
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
                        {manga?.node?.title?.userPreferred}
                    </Text>

                    <View
                        style={tailwind('flex flex-row flex-wrap w-full')}
                    >
                        {manga?.node?.genres?.map((genre, index) => (
                            <Text
                                key={index}
                                style={tailwind('mr-2 mt-2 px-2 py-1 h-[28px] rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-sm border border-zinc-800 dark:border-zinc-400')}

                            >
                                {genre}
                            </Text>
                        ))}
                    </View>

                    <View style={tailwind('flex flex-row flex-wrap w-full')}>
                        {!!manga?.node?.duration &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Duration: {manga?.node?.duration} mins
                                </Text>
                            </View>
                        }

                        {!!manga?.node?.episodes &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Ep: {manga?.node?.episodes} episodes
                                </Text>
                            </View>
                        }

                        {!!manga?.node?.trending &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Trending: #{manga?.node?.trending}
                                </Text>
                            </View>
                        }

                        {!!manga?.node?.favourites &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Fav: {manga?.node?.favourites}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}