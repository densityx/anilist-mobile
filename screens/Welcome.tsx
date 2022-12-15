import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import Label from "../components/Common/Label";

const DEPENDENCIES: string[] = [
    'React Native Expo',
    'React Navigation',
    'Zustand',
    'TypeScript',
    'Tailwind CSS',
    'AsyncStorage',
    'WebView / YouTube'
];

const TOOLS: string[] = [
    'WebStorm',
    'Expo Go on Android',
    'Chrome',
    'IOS Simulator'
];

export default function Welcome() {
    const tailwind = useTailwind();

    return (
        <SafeAreaView style={tailwind('m-4')}>
            <Label>
                About
            </Label>

            <View style={tailwind('mt-3 p-4 bg-white dark:bg-zinc-800 rounded-xl')}>
                <Text style={tailwind('font-semibold text-xl text-teal-400')}>
                    AniList Mobile
                </Text>

                <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                    This is sample React Native app (expo) project that consumes AniList GraphQL API
                </Text>
            </View>

            <View style={tailwind('mt-3')}>
                <Label>
                    Dependencies
                </Label>

                <View style={tailwind('flex flex-row flex-wrap mt-3')}>
                    {DEPENDENCIES.map((dependency, index) => (
                        <Card key={index} styles={'mr-1 mb-1'}>
                            <Text style={tailwind('dark:text-zinc-400')}>
                                {dependency}
                            </Text>
                        </Card>
                    ))}
                </View>
            </View>

            <View style={tailwind('mt-3')}>
                <Label>
                    Tools
                </Label>

                <View style={tailwind('flex flex-row flex-wrap mt-3')}>
                    {TOOLS.map((tool, index) => (
                        <Card key={index} styles={'mr-1 mb-1'}>
                            <Text style={tailwind('dark:text-zinc-400')}>
                                {tool}
                            </Text>
                        </Card>
                    ))}
                </View>
            </View>

            <View style={tailwind('mt-3')}>
                <Label>
                    Developer
                </Label>

                <View style={tailwind('mt-3 flex flex-row flex-wrap')}>
                    <Card>
                        <Text style={tailwind('dark:text-zinc-400')}>
                            Ahmad Aziz (ahmadaziz0441@gmail.com)
                        </Text>
                    </Card>
                </View>
            </View>
        </SafeAreaView>
    )
}