import React from "react";
import {useTailwind} from "tailwind-rn";
import {ActivityIndicator, SafeAreaView} from "react-native";

export default function LoadingScreen() {
    const tailwind = useTailwind();

    return (
        <SafeAreaView style={tailwind('h-full flex items-center justify-center')}>
            <ActivityIndicator size="large" color={'#14b8a6'}/>
        </SafeAreaView>
    )
}