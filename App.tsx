// import {TailwindProvider, useTailwind} from 'tailwind-rn';
// import utilities from './tailwind.json';
// import React from 'react';
// import AnimeList from "./components/AnimeList";
// import {SafeAreaView, View, Text} from "react-native";
//
// export default function App() {
//     const tailwind = useTailwind();
//
//     return (
//         <TailwindProvider utilities={utilities}>
//             <SafeAreaView style={tailwind('h-full')}>
//                 <View style={tailwind('pt-12 items-center')}>
//                     <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
//                         <Text style={tailwind('text-blue-800 font-semibold')}>
//                             Hello Tailwind
//                         </Text>
//                     </View>
//                 </View>
//             </SafeAreaView>
//             {/*<AnimeList/>*/}
//         </TailwindProvider>
//     )
// }

import React from "react";
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';
import AnimeList from "./screens/AnimeList";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Account from "./screens/Account";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import Welcome from "./screens/Welcome";
import Favorites from "./screens/Favorites";
import {useColorScheme} from "react-native";
import {
    IconAbc,
    IconArtboard,
    IconBraces,
    IconHeart,
    IconHome2,
    IconLayoutList,
    IconUserCircle
} from 'tabler-icons-react-native';
import AnimeShow from "./screens/AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MangaList from "./screens/MangaList";

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
    // const scheme = useColorScheme();
    const scheme = 'dark';
    const Tab = createBottomTabNavigator();
    const AnimeListStack = createNativeStackNavigator();

    return (
        <TailwindProvider utilities={utilities} colorScheme={scheme}>
            <NavigationContainer theme={scheme == 'dark' ? MyThemeDark : MyThemeLight}>
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

                            // You can return any component that you like here!
                            // return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                        tabBarActiveTintColor: 'teal',
                        tabBarInactiveTintColor: 'gray'
                    })}
                >
                    <Tab.Screen
                        name={'Welcome'}
                        component={Welcome}
                        options={{title: 'Welcome', headerTitle: 'Welcome to Anilist Mobile'}}
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
                        name={'Account'}
                        component={Account}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
};

export default App;