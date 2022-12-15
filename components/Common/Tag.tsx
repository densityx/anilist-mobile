import {Text, View} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

export default function Tag({genre, style = ''}: { genre: string, style?: string }) {
    const tailwind = useTailwind();

    return (
        <View
            style={tailwind(`px-2 py-1 h-[28px] rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-400 ${style}`)}>
            <Text
                style={tailwind('text-zinc-800 dark:text-zinc-300 text-sm')}
            >
                {genre}
            </Text>
        </View>
    )
}