import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {Layout, LightSpeedInLeft, LightSpeedOutRight} from 'react-native-reanimated';
import {useTailwind} from "tailwind-rn";
import Button from '../components/Common/Button';
import InputSearch from "../components/Common/InputSearch";
import Card from "../components/Common/Card";
import {useTodoStore} from "../store/zustand";
import {retrieveData} from "../services/paginatedQuery";
import {useDebouncedValue} from "@mantine/hooks";
import LoadingScreen from "../components/Common/LoadingScreen";
import {LinearGradient} from "expo-linear-gradient";
import {IconPlus} from "tabler-icons-react-native";

const AnimeCardSearchItem = ({anime, handlePress}) => {
    const tailwind = useTailwind();

    return (
        <TouchableOpacity
            onPress={() => handlePress(anime)}
            style={tailwind('relative flex flex-row items-center w-full p-4')}
        >
            <View style={tailwind('flex flex-row items-start')}>
                <View style={tailwind('w-[25%] bg-white rounded-lg overflow-hidden')}>
                    <Image
                        source={{
                            uri: anime?.coverImage?.large
                        }}
                        style={tailwind('h-[80px] w-full')}
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                        style={tailwind('absolute top-0 right-0 left-0 h-full')}
                    />
                </View>

                <View
                    style={tailwind('w-[55%] p-2')}
                >
                    <Text style={tailwind('text-zinc-800 dark:text-zinc-400 font-medium')}>
                        {anime?.title?.userPreferred}
                    </Text>
                </View>
            </View>

            <View style={tailwind('absolute right-0 mr-4 p-2 bg-teal-400 rounded-xl')}>
                <IconPlus color={'#fff'} size={24}/>
            </View>
        </TouchableOpacity>
    )
}

const SearchAnimeModal = ({open, handleCloseModal}) => {
    const tailwind = useTailwind();
    const [term, setTerm] = useState('naruto');
    const [debounced] = useDebouncedValue(term, 500);
    const [allAnime, setAllAnime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const addTodo = useTodoStore(state => state.addTodo);

    const retrieveAnime = useCallback(async () => {
        setLoading(true);
        setPage(1);

        let {
            data: {
                Page: {media: retrievedAnime, pageInfo: {hasNextPage}},
            }
        } = await retrieveData(debounced, page, 'ANIME')

        setAllAnime(retrievedAnime);
        setHasNextPage(hasNextPage);
        setLoading(false);
    }, [debounced]);

    const retrieveNextAnime = useCallback(async () => {
        let {
            data: {
                Page: {media: retrievedAnime, pageInfo: {hasNextPage}},
            }
        } = await retrieveData(debounced, page, 'ANIME')

        setAllAnime((prevState) => [...prevState, ...retrievedAnime]);
        setHasNextPage(hasNextPage);
    }, [page]);

    useEffect(() => {
        if (page !== 1) {
            retrieveNextAnime();
        }
    }, [retrieveNextAnime, page]);

    useEffect(() => {
        retrieveAnime();
    }, [retrieveAnime, debounced]);

    const handleSelectAnimeItem = (anime) => {
        addTodo(anime);

        handleCloseModal();
    }

    return <Modal
        animationType={'fade'}
        visible={open}
    >
        <SafeAreaView
            style={tailwind('flex pb-12 bg-white dark:bg-zinc-900')}
        >
            <View style={tailwind('p-4')}>
                <InputSearch
                    term={term}
                    style={tailwind('bg-zinc-100 dark:bg-zinc-800')}
                    onChangeText={(text) => setTerm(text)}
                    placeholder={'Search anime...'}
                />
            </View>

            {loading
                ? <LoadingScreen/>
                : <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={allAnime}
                    renderItem={({item}) => <AnimeCardSearchItem anime={item} handlePress={handleSelectAnimeItem}/>}
                    keyExtractor={(anime, index) => index.toString()}
                    numColumns={2}
                    refreshing={loading}
                    onRefresh={retrieveAnime}
                    ListEmptyComponent={() => (
                        <View style={tailwind('p-4')}>
                            <Card styles={'px-4'}>
                                <Text
                                    style={tailwind('font-bold text-center text-lg text-zinc-800 dark:text-teal-500')}
                                >
                                    Search anime and get the result here...
                                </Text>
                            </Card>
                        </View>
                    )}
                    ListFooterComponent={() => hasNextPage && (
                        <ActivityIndicator
                            style={tailwind('h-[100px]')}
                            size="large"
                            color={'#14b8a6'}
                        />
                    )}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => hasNextPage && setPage(page + 1)}
                />
            }
        </SafeAreaView>
    </Modal>
}

function TodoItem({anime, onRemove}: { name: any; onRemove: () => void; }): React.ReactElement {
    const tailwind = useTailwind();

    return (
        <Animated.View
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
            layout={Layout.springify()}
            style={tailwind('relative flex flex-row items-center w-full mb-1 p-4 bg-white rounded-xl')}
        >
            <View style={tailwind('flex flex-row items-start')}>
                <View style={tailwind('w-[25%] bg-white rounded-lg overflow-hidden')}>
                    <Image
                        source={{
                            uri: anime?.coverImage?.large
                        }}
                        style={tailwind('h-[80px] w-full')}
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                        style={tailwind('absolute top-0 right-0 left-0 h-full')}
                    />
                </View>

                <View
                    style={tailwind('w-[55%] p-2')}
                >
                    <Text style={tailwind('text-zinc-800 dark:text-zinc-400 font-medium')}>
                        Watch {anime?.title?.userPreferred}
                    </Text>
                </View>
            </View>

            <Pressable
                style={tailwind('absolute right-0 mr-4 p-2 bg-teal-400 rounded-xl')}
                onPress={() => onRemove()}
            >
                <Text style={tailwind('text-white')}>
                    Remove
                </Text>
            </Pressable>
        </Animated.View>
    );
}

export default function TodoScreen(): React.ReactElement {
    const todos = useTodoStore(state => state.todos)
    const removeTodo = useTodoStore(state => state.removeTodo);
    const [toggleOpenModal, setToggleOpenModal] = useState(false);

    const tailwind = useTailwind();

    return (
        <SafeAreaView style={tailwind('h-full m-4')}>
            <ScrollView style={[{width: '100%'}]}>
                {todos.length ? (
                    todos.map((anime) => (
                        <TodoItem
                            key={anime.id}
                            anime={anime}
                            onRemove={() => removeTodo(anime.id)}
                        />
                    ))
                ) : (
                    <Card style={tailwind('w-full bg-white p-4 rounded-lg')}>
                        <Text style={tailwind('dark:text-zinc-400 text-center')}>
                            There are currently no anime to watch
                        </Text>
                    </Card>
                )}
            </ScrollView>

            <SearchAnimeModal
                open={toggleOpenModal}
                handleCloseModal={() => setToggleOpenModal(false)}
            />

            <View style={tailwind('mb-8')}>
                <Button
                    text={'Add anime to watch'}
                    onPress={() => setToggleOpenModal(true)}
                />
            </View>
        </SafeAreaView>
    );
}