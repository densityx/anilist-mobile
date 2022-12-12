import React from "react";
import {View, Text} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";

const DEPENDENCIES = [
    'React Native Expo',
    'React Navigation',
    'React Redux',
    'TypeScript',
    'Tailwind CSS',
    'AsyncStorage',
];

const TOOLS = [
    'WebStorm',
    'Expo Go on Android',
    'Chrome'
];

export default function Home() {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('p-4')}>
            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                About
            </Text>

            <View style={tailwind('mt-3 p-4 bg-white dark:bg-zinc-800 rounded-xl')}>
                <Text style={tailwind('font-semibold text-xl text-teal-400')}>
                    Welcome to AniList Mobile
                </Text>

                <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                    This is sample React Native app (expo) project that consumes AniList GraphQL API
                </Text>
            </View>

            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                Dependencies
            </Text>

            <View style={tailwind('flex flex-row flex-wrap mt-3')}>
                {DEPENDENCIES.map((dependency, index) => (
                    <Card key={index} styles={'mr-1 mb-1'}>
                        <Text style={tailwind('dark:text-zinc-400')}>
                            {dependency}
                        </Text>
                    </Card>
                ))}
            </View>

            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                Developer
            </Text>

            <Card styles={'mt-3'}>
                <Text style={tailwind('dark:text-zinc-400')}>
                    Ahmad Aziz (ahmadaziz0441@gmail.com)
                </Text>
            </Card>

            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                Tools
            </Text>

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
    )
}