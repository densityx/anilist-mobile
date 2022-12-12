import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    TextInput,
    Pressable,
    useColorScheme,
    Appearance, ActivityIndicator, FlatList
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {retrieveData} from "../services/paginatedQuery";
import {useTailwind} from "tailwind-rn";
import AnimeCard from "../components/Anime/AnimeCard";
import {NavigationContainer} from "@react-navigation/native";
import AnimeShow from "./AnimeShow";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDebouncedValue} from "@mantine/hooks";
import Svg, {Circle, Line, Path} from "react-native-svg";
import getColorScheme = Appearance.getColorScheme;
import {IconSearch} from "tabler-icons-react-native";
import LoadingScreen from "../components/Common/LoadingScreen";

const data = {
    "data": {
        "Page": {
            "pageInfo": {"total": 5000, "currentPage": 1, "lastPage": 1666, "hasNextPage": true, "perPage": 3},
            "media": [{
                "id": 55191,
                "title": {"romaji": "Fate\/Zero"},
                "description": "The Fourth Holy Grail War has begun, and seven mages must summon heroes from history to battle each other to the death. Only one mage-and-hero pair will remain to claim the Grail and have their wishes granted! Kiritsugu Emiya was once an assassin but now fights in this war to save the world from those who would destroy it with the Grail\u2019s power.<br><br>\n(Source: Dark Horse)",
                "coverImage": {"large": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/manga\/cover\/medium\/25191.jpg"}
            }, {
                "id": 10087,
                "title": {"romaji": "Fate\/Zero"},
                "description": "With the promise of granting any wish, the omnipotent Holy Grail triggered three wars in the past, each too cruel and fierce to leave a victor. In spite of that, the wealthy Einzbern family is confident that the Fourth Holy Grail War will be different; namely, with a vessel of the Holy Grail now in their grasp. Solely for this reason, the much hated \"Magus Killer\" Kiritsugu Emiya is hired by the Einzberns, with marriage to their only daughter Irisviel as binding contract.\n<br><br>\nKiritsugu now stands at the center of a cutthroat game of survival, facing off against six other participants, each armed with an ancient familiar, and fueled by unique desires and ideals. Accompanied by his own familiar, Saber, the notorious mercenary soon finds his greatest opponent in Kirei Kotomine, a priest who seeks salvation from the emptiness within himself in pursuit of Kiritsugu.\n<br><br>\nBased on the light novel written by Gen Urobuchi, <i>Fate\/Zero<\/i> depicts the events of the Fourth Holy Grail War\u201410 years prior to <i>Fate\/stay night<\/i>. Witness a battle royale in which no one is guaranteed to survive.\n<br><br>\n(Source: MAL Rewrite)\n<br><br>\n<i>Note: The first episode aired with a runtime of ~48 minutes as opposed to the standard 24 minute long episode.<\/i>",
                "coverImage": {"large": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/anime\/cover\/medium\/bx10087-el5Bo1VMZwsU.png"}
            }, {
                "id": 33649,
                "title": {"romaji": "Fate\/Zero"},
                "description": "War of the Holy Grail - Pursuing the power of the \"Holy Grail\" which grants a miracle, this is a contest in which seven magi summon seven Heroic Spirits to compete for it. In that battle whose conclusion was postponed three times, now, the fourth war commenced again. Entrusting their dearest wish of victory, the magi joined the battleground called \"Fuyuki\", but amongst them, there was a man who was always alone, and could not find out the meaning behind his fights. His name was Kotomine Kirei. Not comprehending the guidance of fate, Kirei was lost, and had kept questioning. Why someone like his was given the Command Seals. However, the fate of his fights crossed Kirei's path with a nemesis by chance. That person is - Emiya Kiritsugu. A man who was sterner than anyone else, more merciless than anyone else, and who sought the miracle of the Holy Grail.<br><br>\n\nMerely recited in fragments in Fate\/Stay Night, this is the Fourth War of the Holy Grail 10 years ago. The truth which unfolded behind the battle between Shir&#333;'s foster father, Rin's father, and the younger Kotomine Kirei, is finally revealed...",
                "coverImage": {"large": "https:\/\/s4.anilist.co\/file\/anilistcdn\/media\/manga\/cover\/medium\/33649-rA0ZBSbWhPkH.png"}
            }]
        }
    }
};

const AnimeListComponent = ({navigation}) => {
    const tailwind = useTailwind();
    const [term, setTerm] = useState('one piece')
    const [debounced] = useDebouncedValue(term, 2000);

    const [loading, setLoading] = useState(true);
    const [allAnime, setAllAnime] = useState([]);

    let scheme = 'dark';

    let retrieveAnime = useCallback(async () => {
        // if (term.length) {
        setLoading(true);
        let {data: {Page}} = await retrieveData(debounced)
        // let {data: {Page}} = data;

        setAllAnime(Page);
        setLoading(false);
        // }
    }, [debounced]);

    useEffect(() => {
        retrieveAnime();
    }, [retrieveAnime]);

    // if (loading) {
    //     return <LoadingScreen/>
    // }

    // const renderAnimeItem = ({data}) => (
    //     console.log('renderAnimeItem', data);
    //
    //     <AnimeCard data={data}/>
    // );

    return loading
        ? <LoadingScreen/>
        : (
            // <View>
            <SafeAreaView>
                {/*<View style={tailwind('items-center')}>*/}
                {/*    <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>*/}
                {/*        <Text style={tailwind('text-blue-800 font-semibold')}>*/}
                {/*            Anime App*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <View style={tailwind('relative flex justify-center p-4')}>
                    <TextInput
                        style={tailwind('pl-8 pr-4 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-white')}
                        placeholder={'Search anime...'}
                        value={term}
                        onChangeText={(text) => setTerm(text)}
                        placeholderTextColor={scheme === 'dark' ? '#a1a1aa' : '#27272a'}
                    />

                    <IconSearch
                        color={scheme === 'dark' ? '#f4f4f5' : '#52525b'}
                        style={tailwind('absolute ml-6')}
                        size={16}
                    />
                </View>

                {/*<View style={tailwind('flex flex-row flex-wrap px-2')}>*/}
                <FlatList
                    data={allAnime.media}
                    renderItem={(item) => <AnimeCard data={item}/>}
                    keyExtractor={anime => {
                        console.log('anime id', anime.id);
                        return anime.id;
                    }}
                    numColumns={2}
                />
                {/*{allAnime.media.map((data) => (*/}
                {/*    <AnimeCard key={data.id} data={data}/>*/}
                {/*))}*/}
                {/*</View>*/}
            </SafeAreaView>
        )
}

export default function AnimeList({navigation}) {
    const AnimeListStack = createNativeStackNavigator();

    return (
        <AnimeListStack.Navigator screenOptions={{headerShown: false}}>
            <AnimeListStack.Screen name={'AnimeListComponent'} component={AnimeListComponent}/>
            <AnimeListStack.Screen name={'AnimeShow'} component={AnimeShow}/>
        </AnimeListStack.Navigator>
    )
}