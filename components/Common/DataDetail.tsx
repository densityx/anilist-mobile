import {Text, View} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";
import Label from "./Label";

export default function DataDetail({hasMedia, name, value}) {
    const tailwind = useTailwind();

    return hasMedia &&
        <View style={tailwind('mt-4 w-1/2')}>
            <Label>
                {name}
            </Label>

            <Text style={tailwind('mt-2 font-medium text-zinc-800 dark:text-zinc-400')}>
                {value}
            </Text>
        </View>
}