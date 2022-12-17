import React, {useCallback, useEffect, useState} from "react";
import {useTailwind} from "tailwind-rn";
import {
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import Card from "../components/Common/Card";
import {IconMoon, IconPencil, IconSun, IconUserCircle} from "tabler-icons-react-native";
import {retrieveData} from "../services/userSingleQuery";
import RenderHtml from 'react-native-render-html';
import LoadingScreen from "../components/Common/LoadingScreen";
import {useUserStore} from "../store/zustand";
import {updateProfile} from "../services/updateUserQuery";
import Label from "../components/Common/Label";
import Button from "../components/Common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account({navigation}) {
    const tailwind = useTailwind();
    const [user, setUser] = useState({});
    const [authToken, setAuthToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4YzRlOWNjNDNmNmYyZmMxNjhlM2Y2NTI0ZTdiMzJiZTQxZjUxM2RjZjUwYjc0YzUzN2FmYzdhM2Q2MzgwYzczOTk4Yzk2NDczYzQwZGY1In0.eyJhdWQiOiIxMDMyMyIsImp0aSI6IjU4YzRlOWNjNDNmNmYyZmMxNjhlM2Y2NTI0ZTdiMzJiZTQxZjUxM2RjZjUwYjc0YzUzN2FmYzdhM2Q2MzgwYzczOTk4Yzk2NDczYzQwZGY1IiwiaWF0IjoxNjcxMjU2NzQ4LCJuYmYiOjE2NzEyNTY3NDgsImV4cCI6MTcwMjc5Mjc0OCwic3ViIjoiNjA5NjU4MCIsInNjb3BlcyI6W119.Ji7X8UPLP2VLw4Ggzm32nvoXm1V37VSEklEN5iB4gmZyo5b_E4eQu9LnGDs3YjtoiBhXhKDABF2fUN7mER5vFtIha-S39wfDuWnfRnVP_WnlIF4pNA64Tqy0zYmcK8ct4bS3IzMgkm2dFGQWCIFXxZ6CRAbttGCofGIQX3I3vNcmvRtHWoJeSwHtyCL1WCZkV6l0xjRSEzBptwKPTM35DCDvbFHjq798ZxvVPzna7n-GuZEc9IeRU0r7TDAuBSa1h6gq4yqVzXitYgOW2-le8zdkelq5QHUDz1KZrz0qllol_MmbNpsm0j38JKg_I4Tv02RROZdlykz7NpiVrsMqPnkfWtemihcFcl-ioqzfavhivnT0xXJFBGj9zBNn9nv_GRfJJV0pH-sUiBeo_AJuxBdvAJqzqqskKA3n_8S9HNQZDXtYrQHG2hM0CLfWjI3aQjeVVU-kL0_evxFxlSrfdRA14F0FEqWpQ1LF6-l1hNFnzLQ7ipwRc9duFMiyjsFBlHnlsMWv7gIDJxPqnUjXjSy6AD1lEQLTc2LkxAONWkROcemN0x1HwjMzIKSzp2m9GPaP4XwnjzhIdiyp2v3T0e1_XAFGY2mu7xdmZxCoA_v4Ab2sVyuI2cVzvpIICNS-_S10_RqT8klktSUOSkKcgPHWue3QO9mZQjBlbutvnF8');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {width} = useWindowDimensions();
    const userToken = useUserStore(state => state.token)
    const setUserToken = useUserStore(state => state.setToken)
    const theme = useUserStore(state => state.theme)
    const toggleTheme = useUserStore(state => state.toggleTheme)

    const getUser = useCallback(async () => {
        setEditMode(false);
        setLoading(true)
        let {data: {User}} = await retrieveData('dnstyx');

        setUser(User);
        setAbout(User.about);
        setLoading(false);
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdateProfile = () => {
        updateProfile(user?.id, user?.name, about, userToken);

        getUser();

        setEditMode(false);
    }

    const handleAuthenticate = async () => {
        setUserToken(authToken);

        try {
            await AsyncStorage.setItem('@access_token', authToken)
        } catch (e) {
            // saving error
        }
    }

    return loading ? <LoadingScreen/> : (
        <SafeAreaView style={tailwind('m-4 h-full')}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={getUser}
                    />
                }
            >
                {!userToken ? (
                    <Card styles={'flex items-center'}>
                        <IconUserCircle
                            size={64}
                            color={theme === 'dark' ? '#52525b' : '#a1a1aa'}
                        />

                        <View style={tailwind('mt-3 w-full')}>
                            <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                AniList Auth Token
                            </Text>

                            <TextInput
                                style={tailwind('mt-3 px-3 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white')}
                                placeholder={'AniList Id'}
                                value={authToken}
                                onChangeText={(text) => setAuthToken(text)}
                                placeholderTextColor={theme === 'dark' ? '#a1a1aa' : '#27272a'}
                            />
                        </View>

                        <Button
                            onPress={handleAuthenticate}
                            text={'Authenticate'}
                            style={'mt-4'}
                        />
                    </Card>
                ) : (
                    <>
                        <Card styles={'flex items-center'}>
                            <View style={tailwind('relative flex items-center w-full')}>
                                <View
                                    style={tailwind('absolute top-0 flex flex-row items-center justify-between w-full')}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleTheme()}
                                        style={tailwind('px-3 py-2 rounded-full bg-zinc-400 dark:bg-zinc-700')}
                                    >
                                        {theme === 'dark' ? (
                                            <IconSun color={'#fff'} size={16}/>
                                        ) : (
                                            <IconMoon color={'#fff'} size={16}/>
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setEditMode(!editMode)}
                                        style={tailwind('px-3 py-2 rounded-full bg-zinc-400 dark:bg-zinc-700')}
                                    >
                                        <IconPencil color={'#fff'} size={16}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={tailwind('bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden')}>
                                    <Image
                                        source={{
                                            uri: user?.avatar?.large
                                        }}
                                        style={tailwind('h-14 w-14')}
                                    />
                                </View>

                                <Text style={tailwind('mt-4 text-xl text-zinc-600 dark:text-zinc-400 font-medium')}>
                                    {user?.name}
                                </Text>

                                <View style={tailwind('mt-2 rounded-xl bg-teal-400')}>
                                    <Text style={tailwind('px-3 py-2 text-xs text-white')}>
                                        {user?.id}
                                    </Text>
                                </View>

                                {!!user?.about && (
                                    <View
                                        style={tailwind(`relative flex mt-4 mb-4 text-white`)}
                                    >
                                        <RenderHtml
                                            contentWidth={width}
                                            source={{html: user?.about}}
                                            tagsStyles={{
                                                body: {
                                                    color: '#a1a1aa',
                                                }
                                            }}
                                        />
                                    </View>
                                )}
                            </View>
                        </Card>


                        {editMode && (
                            <Card styles={'mt-4'}>
                                <View style={tailwind('w-full')}>
                                    <Text style={tailwind('text-xl text-teal-500 font-semibold')}>
                                        Edit User Details
                                    </Text>

                                    <Label>
                                        About
                                    </Label>

                                    <TextInput
                                        style={tailwind('mt-3 px-3 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white')}
                                        placeholder={'about you'}
                                        value={about}
                                        onChangeText={(text) => setAbout(text)}
                                        placeholderTextColor={theme === 'dark' ? '#a1a1aa' : '#27272a'}
                                    />
                                </View>

                                <Button
                                    onPress={handleUpdateProfile}
                                    text={'Update'}
                                    style={'mt-4'}
                                />
                            </Card>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}