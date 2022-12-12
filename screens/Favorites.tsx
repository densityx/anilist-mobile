import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView} from "react-native";
import {useTailwind} from "tailwind-rn";
import Card from "../components/Common/Card";
import {IconInfoCircle} from "tabler-icons-react-native";
import {retrieveData} from '../services/userFavoriteSingleQuery';

export default function Settings({navigation}) {
    const scheme = 'dark';
    const tailwind = useTailwind();
    const [loading, setLoading] = useState(false);

    const getUser = useCallback(async () => {
        setLoading(true)
        let {data} = await retrieveData();

        console.log('data', data.User.favourites.anime.edges[0].node, data.User.favourites.manga);
        // setUser(User);
        setLoading(false);
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    const handlePress = () => {
        navigation.navigate('AnimeList');
    }

    return (
        <SafeAreaView style={tailwind('p-4')}>
            <Card styles={'flex items-center justify-center bg-zinc-800 rounded-xl'}>
                <IconInfoCircle
                    size={64}
                    color={scheme === 'dark' ? '#f4f4f5' : '#52525b'}
                />

                <Text style={tailwind('mt-3 text-center text-zinc-800 dark:text-zinc-400 text-lg')}>
                    You have to authenticate to see this page
                </Text>
            </Card>
        </SafeAreaView>
    )
}