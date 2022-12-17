import React from "react";
import {useTailwind} from "tailwind-rn";
import {View} from "react-native";

export default function Card({children, styles = ''}) {
    const tailwind = useTailwind();

    return (
        <View
            // entering={LightSpeedInLeft}
            // exiting={LightSpeedOutRight}
            // layout={Layout.springify()}
            style={tailwind(`bg-white dark:bg-zinc-800 p-4 rounded-xl ${styles}`)}
        >
            {children}
        </View>
    )
}