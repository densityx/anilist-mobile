import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {useTailwind} from "tailwind-rn";
import Tag from "../Common/Tag";

export default function MangaCardHorizontal({manga}) {
    const navigation = useNavigation();
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            key={manga?.id}
            onPress={() => {
                console.log('manga', manga.id);
                navigation.navigate('MangaShow', {
                    mangaId: manga?.id,
                    mangaName: manga?.title?.userPreferred
                });
            }}
        >
            <View style={tailwind('flex flex-row flex-wrap w-full mt-4')}>
                <View
                    style={tailwind('relative flex items-center justify-center w-1/4 bg-white dark:bg-zinc-700 rounded-lg overflow-hidden')}
                >
                    <Image
                        source={{
                            uri: manga?.coverImage?.large
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
                        {manga?.title?.userPreferred}
                    </Text>

                    <View
                        style={tailwind('flex flex-row flex-wrap w-full')}
                    >
                        {manga?.genres?.map((genre, index) => (
                            <Tag genre={genre} key={index} style={'mr-2 mt-2'}/>
                        ))}
                    </View>

                    <View style={tailwind('flex flex-row flex-wrap w-full')}>
                        {!!manga?.duration &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Duration: {manga?.duration} mins
                                </Text>
                            </View>
                        }

                        {!!manga?.trending &&
                            <View style={tailwind('mt-2 w-1/2')}>
                                <Text
                                    style={tailwind('text-zinc-800 dark:text-zinc-400')}
                                >
                                    Trending: #{manga?.trending}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}