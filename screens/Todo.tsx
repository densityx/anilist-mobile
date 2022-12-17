import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Animated, {Layout, LightSpeedInLeft, LightSpeedOutRight} from 'react-native-reanimated';
import {useTailwind} from "tailwind-rn";
import Button from '../components/Common/Button';
import InputSearch from "../components/Common/InputSearch";
import Card from "../components/Common/Card";
import {useTodoStore} from "../store/zustand";

function TodoItem({name, onRemove,}: { name: string; onRemove: () => void; }): React.ReactElement {
    const tailwind = useTailwind();

    return (
        <Animated.View
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
            layout={Layout.springify()}
            style={tailwind('flex flex-row items-center justify-between mb-1 p-3 bg-orange-50 dark:bg-zinc-800 border-b border-orange-400 dark:border-zinc-700 rounded-xl')}
        >
            <Text style={tailwind('dark:text-zinc-400')}>
                {name}
            </Text>

            <Button
                text="Remove"
                style={'w-1/4 py-2'}
                onPress={() => onRemove()}
            />
        </Animated.View>
    );
}

export default function TodoScreen(): React.ReactElement {
    const [newTodo, setNewTodo] = useState('');
    const todos = useTodoStore(state => state.todos)
    const addTodo = useTodoStore(state => state.addTodo);
    const removeTodo = useTodoStore(state => state.removeTodo);

    const tailwind = useTailwind();

    return (
        <SafeAreaView style={tailwind('h-full m-4')}>
            <ScrollView style={[{width: '100%'}]}>
                {todos.length ? (
                    todos.map((participant) => (
                        <TodoItem
                            key={participant.id}
                            name={participant.name}
                            onRemove={() => removeTodo(participant.id)}
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

            <View style={tailwind('w-full flex flex-row items-center mb-8')}>
                <View style={tailwind('w-9/12 pr-2')}>
                    <InputSearch
                        term={newTodo}
                        onChangeText={setNewTodo}
                        placeholder={'Add anime to watch'}
                    />
                </View>

                <View style={tailwind('w-3/12 pl-2')}>
                    <Button
                        text="Add"
                        style={'py-2'}
                        disabled={newTodo === ''}
                        onPress={() => {
                            addTodo({
                                name: newTodo,
                                id: Date.now().toString()
                            });

                            setNewTodo('');
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}