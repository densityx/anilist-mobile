import React from "react";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import AnimeList from "./screens/AnimeList";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Account from "./screens/Account";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Welcome from "./screens/Welcome";
import Favorites from "./screens/Favorites";
import {
    IconArtboard,
    IconBookmark,
    IconBraces,
    IconHeart,
    IconLayoutList,
    IconUserCircle
} from 'tabler-icons-react-native';
import MangaList from "./screens/MangaList";
import LogoutButton from "./components/Common/LogoutButton";
import {useUserStore} from "./store/zustand";
import TodoScreen from "./screens/Todo";

const MyThemeLight = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f4f4f5'
    }
}

const MyThemeDark = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#18181b'
    }
}

const App = () => {
    const theme = useUserStore(state => state.theme)
    const Tab = createBottomTabNavigator();

    return (
        <TailwindProvider utilities={utilities} colorScheme={theme}>
            <NavigationContainer theme={theme == 'dark' ? MyThemeDark : MyThemeLight}>
                <Tab.Navigator
                    initialRouteName={'Welcome'}
                    id={'DefaultTabNavigator'}
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {

                            if (route.name === 'Welcome') {
                                return <IconBraces color={color} size={size}/>
                                // iconName = focused
                                //     ? 'ios-home'
                                //     : 'ios-home-outline';
                            }

                            if (route.name === 'AnimeList') {
                                return <IconLayoutList color={color} size={size}/>
                            }

                            if (route.name === 'MangaList') {
                                return <IconArtboard color={color} size={size}/>
                            }

                            if (route.name === 'Favorites') {
                                return <IconHeart color={color} size={size}/>
                            }

                            if (route.name === 'Account') {
                                return <IconUserCircle color={color} size={size}/>;
                            }

                            if (route.name === 'Anime Todo') {
                                return <IconBookmark color={color} size={size}/>
                            }
                        },
                        tabBarActiveTintColor: 'teal',
                        tabBarInactiveTintColor: 'gray'
                    })}
                >
                    <Tab.Screen
                        name={'Welcome'}
                        component={Welcome}
                        options={{title: 'Welcome', headerTitle: 'Welcome to AniList Mobile'}}
                    />
                    <Tab.Screen
                        name={'AnimeList'}
                        component={AnimeList}
                        options={{title: 'Anime List', headerShown: false}}
                    />
                    <Tab.Screen
                        name={'MangaList'}
                        component={MangaList}
                        options={{title: 'Manga List', headerShown: false}}
                    />
                    <Tab.Screen
                        name={'Favorites'}
                        component={Favorites}
                        options={{headerShown: false}}
                    />
                    <Tab.Screen
                        name={'Anime Todo'}
                        component={TodoScreen}
                    />
                    <Tab.Screen
                        name={'Account'}
                        component={Account}
                        options={{
                            headerRight: (props) => (
                                <LogoutButton/>
                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
};

export default App;