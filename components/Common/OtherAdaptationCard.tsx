import {Image, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {useTailwind} from "tailwind-rn";
import {useNavigation} from "@react-navigation/native";

export default function OtherAdaptationCard({anime}) {
    const tailwind = useTailwind();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={tailwind('relative mr-2 rounded-lg overflow-hidden w-[120px]')}
            onPress={() => {
                navigation.goBack();

                if (anime?.type === 'ANIME') {
                    navigation.navigate('AnimeShow', {
                        animeId: anime?.id,
                        animeName: anime?.title?.userPreferred,
                    })
                }

                if (anime?.type === 'MANGA') {
                    navigation.navigate('MangaShow', {
                        mangaId: anime?.id,
                        mangaName: anime?.title?.userPreferred,
                    })
                }
            }}
        >
            <Image
                source={{
                    uri: anime?.coverImage?.large
                }}
                style={tailwind('h-[180px] w-full')}
            />

            <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                style={tailwind('absolute top-0 right-0 left-0 h-full')}
            />

            <View
                style={tailwind('absolute flex justify-end bottom-0 left-0 h-[54px] p-2')}
            >
                <Text
                    style={tailwind('mt-2 font-medium text-white')}
                >
                    {anime?.title?.userPreferred}
                </Text>
            </View>
        </TouchableOpacity>
    )
}