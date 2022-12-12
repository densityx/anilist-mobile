import React from "react";
import {Text, Image, Pressable, View, TouchableOpacity, TouchableHighlight} from "react-native";
import {useTailwind} from "tailwind-rn";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

export default function AnimeCard({data}) {
    console.log('data anime card:', data);
    const navigation = useNavigation();
    const tailwind = useTailwind();

    const handlePress = () => {
        navigation.navigate('AnimeShow', {
            animeId: data?.item?.id
        });
    };

    return (
        <TouchableHighlight
            onPress={handlePress}
            style={tailwind('w-1/2 p-4')}
        >
            <View style={tailwind('bg-white rounded-lg overflow-hidden')}>
                <Image
                    source={{
                        uri: data?.item?.coverImage?.large
                    }}
                    style={tailwind('h-[260px] w-full')}
                />

                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                    style={tailwind('absolute top-0 right-0 left-0 h-full')}
                />

                <View
                    style={tailwind('absolute flex justify-end items-start w-full bottom-0 left-0 h-[64px] p-2')}>
                    <Text style={tailwind('text-lg text-zinc-200 font-medium')}>
                        {data?.item?.title?.romaji}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}