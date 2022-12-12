import React from "react";
import {View, Text} from "react-native";
import {useTailwind} from "tailwind-rn";

export default function Home() {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('p-4')}>
            <View style={tailwind('p-4 bg-white dark:bg-zinc-800 rounded-xl')}>
                <Text style={tailwind('font-semibold text-xl text-center text-teal-400')}>
                    Welcome to Anime App
                </Text>
            </View>
        </View>
    )
}