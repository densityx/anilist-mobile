import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

export default function Button({
                                   onPress,
                                   text,
                                   style = '',
                                   ...props
                               }: { onPress: () => void; text: string; style: string; props: any }) {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={tailwind(`p-3 w-full rounded-md bg-teal-500 ${style}`)}
            {...props}
        >
            <Text
                style={tailwind('text-white font-semibold text-center')}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}