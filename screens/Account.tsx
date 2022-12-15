import React, {useCallback, useEffect, useState} from "react";
import {useTailwind} from "tailwind-rn";
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Image,
    useWindowDimensions, ScrollView, RefreshControl
} from "react-native";
import Card from "../components/Common/Card";
import {IconMoon, IconPencil, IconSun, IconUserCircle} from "tabler-icons-react-native";
import {retrieveData} from "../services/userSingleQuery";
import RenderHtml from 'react-native-render-html';
import LoadingScreen from "../components/Common/LoadingScreen";
import {useUserStore} from "../store/zustand";
import {updateProfile} from "../services/updateUserQuery";

export default function Account({navigation}) {
    const tailwind = useTailwind();
    const [user, setUser] = useState({});
    const [authToken, setAuthToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU5Y2I2ODM3Nzc0NjgwOTZjODhlYWM1ODU2Mjk4NTQxYWFmMjYzZmRmMTU4ZWY3ODIwOWI5ZjI4Yzg2NWUxNjY1MTM0YjI2MzcyZmE0YzgxIn0.eyJhdWQiOiIxMDMyMyIsImp0aSI6ImU5Y2I2ODM3Nzc0NjgwOTZjODhlYWM1ODU2Mjk4NTQxYWFmMjYzZmRmMTU4ZWY3ODIwOWI5ZjI4Yzg2NWUxNjY1MTM0YjI2MzcyZmE0YzgxIiwiaWF0IjoxNjcwNzYxMTU5LCJuYmYiOjE2NzA3NjExNTksImV4cCI6MTcwMjI5NzE1OSwic3ViIjoiNjA5NjU4MCIsInNjb3BlcyI6W119.dfzkbkCT_MjkJndVTXFgwSrUSG_lEauQ4OZ_dB0EZD5VIlKoEv_69ZQsRW-hXYqoHTSTHJGjtm2TxZF7SCWZ75XiPpd0kW4IcY6e53J3BAcYBUnZ9wWwXDQfbMREwi4UYlMjk0TZyTDmJg10jpQLoh4DMMY3KKDytX4_jA68eGnaUzB0DXogzpLT7YHdGjilV6TNL8jJcTbkWpNKsRNwwoH9RxcrK9Gz9DYroc57iktaTRQ1gLCFRD4ni3TCL6-JAWYcBITJGNb5kUguG5dllLy_n1IdpiGwWM4EBufvYXp45Nj63Us2Nrd2XSmtpmjKEzgRdqHLndi2LOSMBVoReWvkoqzSkEzVUa_S2py8IRx60GFHosSn9dxCQIGH544-SUkNigMoaYsQziIZQlfoQ1BcqKakIEGGhqlpeMXtJkMi6BpEqSA0sl5jmT0kGptqa9HysElaWiZLzSv4pDkV7wdbghqAR0su9ZdnpbulCdM8hwE7Jd6xZ6PDDJV8RWWlT_sq2V0vUrHyBc6Bk18GKVNADakE9d9uXlJLGe42Da0IA0PT9hm80ZD_iljIzJYapnykRVkKAMStmDlMZv_peJ8c8pWhf3YyxOL1NXwOmqRWo-i_4hvlvSKYZjdKIM1fji5qu7ZMwkaaX1vR9r5dXJyciqETysiuXwnUcmLo-aU');
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

        // console.log('user data', User);
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

    const handleAuthenticate = () => {
        setUserToken(authToken);
    }

    return loading ? <LoadingScreen/> : (
        <SafeAreaView style={tailwind('p-4 h-full')}>
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

                        <View style={tailwind('mt-4 w-full')}>
                            <TouchableOpacity
                                onPress={handleAuthenticate}
                                style={tailwind('p-3 w-full rounded-md bg-teal-500')}
                            >
                                <Text
                                    style={tailwind('text-white font-semibold text-center')}
                                >
                                    Authenticate
                                </Text>
                            </TouchableOpacity>
                        </View>
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

                                <Text style={tailwind('mt-2 px-3 py-2 text-xs text-teal-50 rounded-full bg-teal-400')}>
                                    {user?.id}
                                </Text>

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

                                    <Text style={tailwind('mt-3 text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                                        About
                                    </Text>

                                    <TextInput
                                        style={tailwind('mt-3 px-3 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white')}
                                        placeholder={'about you'}
                                        value={about}
                                        onChangeText={(text) => setAbout(text)}
                                        placeholderTextColor={theme === 'dark' ? '#a1a1aa' : '#27272a'}
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={handleUpdateProfile}
                                    style={tailwind('mt-4 p-3 w-full rounded-md bg-teal-500')}
                                >
                                    <Text
                                        style={tailwind('text-white font-semibold text-center')}
                                    >
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </Card>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}