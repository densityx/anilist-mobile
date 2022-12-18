import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

interface ButtonProps {
    onPress: () => void;
    text: string;
    style: any;
    props: any
}

export default function Button({onPress, text, style = '', ...props}: ButtonProps) {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...tailwind(`p-3 w-full rounded-md bg-teal-500`), ...style}}
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