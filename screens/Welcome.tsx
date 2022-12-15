import React from "react";
import {View, Text, Pressable} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import {useBearStore} from "../store/zustand";
import {IconHeart} from "tabler-icons-react-native";

const DEPENDENCIES = [
    'React Native Expo',
    'React Navigation',
    'Zustand',
    'TypeScript',
    'Tailwind CSS',
    'AsyncStorage',
    'WebView / YouTube'
];
const TOOLS = [
    'WebStorm',
    'Expo Go on Android',
    'Chrome'
];

export default function Welcome() {
    const tailwind = useTailwind();
    const bears = useBearStore((state) => state.bears);
    const increasePopulation = useBearStore((state) => state.increasePopulation);

    return (
        <View style={tailwind('p-4')}>
            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                About
            </Text>

            <View style={tailwind('mt-3 p-4 bg-white dark:bg-zinc-800 rounded-xl')}>
                <Text style={tailwind('font-semibold text-xl text-teal-400')}>
                    AniList Mobile
                </Text>

                <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                    This is sample React Native app (expo) project that consumes AniList GraphQL API
                </Text>

                <Pressable
                    onPress={increasePopulation}
                    style={tailwind('flex items-center justify-center flex-row mt-4 p-3 w-full rounded-md bg-rose-500')}
                >
                    <IconHeart color={'#fff'} size={16}/>

                    <Text
                        style={tailwind('ml-1 text-white font-semibold text-center')}
                    >
                        {bears}
                    </Text>
                </Pressable>
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

            <Text style={tailwind('mt-3 dark:text-zinc-400 leading-[28px]')}>
                Developer
            </Text>

            <View style={tailwind('mt-3 flex flex-row flex-wrap')}>
                <Card>
                    <Text style={tailwind('dark:text-zinc-400')}>
                        Ahmad Aziz (ahmadaziz0441@gmail.com)
                    </Text>
                </Card>
            </View>
        </View>
    )
}