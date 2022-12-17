import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Animated, {Layout, LightSpeedInLeft, LightSpeedOutRight} from 'react-native-reanimated';
import {useTailwind} from "tailwind-rn";
import Button from '../components/Common/Button';
import InputSearch from "../components/Common/InputSearch";

interface EventTodo {
    name: string;
    id: string;
}

const styles = {
    participantView: {
        borderBottomColor: 'black',
        width: '100%',
        borderBottomWidth: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fffbeb',
    }
}

function TodoItem({name, onRemove,}: { name: string; onRemove: () => void; }): React.ReactElement {
    return (
        <Animated.View
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
            layout={Layout.springify()}
            style={useTailwind()('flex flex-row items-center justify-between p-3 bg-orange-50 border-b border-orange-400')}
        >
            <Text>{name}</Text>

            <Button
                text="Remove"
                style={'w-1/4 py-2'}
                onPress={() => onRemove()}
            />
        </Animated.View>
    );
}

export default function TodoScreen(): React.ReactElement {
    const [inputValue, setInputValue] = useState('');
    const [participantList, setTodoList] = useState<EventTodo[]>(
        []
    );

    const addTodo = () => {
        setTodoList(
            [{name: inputValue, id: Date.now().toString()}].concat(participantList)
        );
        setInputValue('');
    };

    const removeTodo = (id: string) => {
        setTodoList(
            participantList.filter((participant) => participant.id !== id)
        );
    };

    const tailwind = useTailwind();

    return (
        <SafeAreaView style={tailwind('h-full m-4')}>
            <ScrollView style={[{width: '100%'}]}>
                {participantList.length ? (
                    participantList.map((participant) => (
                        <TodoItem
                            key={participant.id}
                            name={participant.name}
                            onRemove={() => removeTodo(participant.id)}
                        />
                    ))
                ) : (
                    <View style={tailwind('w-full bg-white p-4 rounded-lg')}>
                        <Text style={tailwind('text-center')}>
                            There are currently no anime to watch
                        </Text>
                    </View>
                )}
            </ScrollView>

            <View style={tailwind('w-full flex flex-row items-center mb-8')}>
                <View style={tailwind('w-9/12 pr-2')}>
                    <InputSearch
                        term={inputValue}
                        onChangeText={setInputValue}
                        placeholder={'Add anime to watch'}
                    />
                </View>

                <View style={tailwind('w-3/12 pl-2')}>
                    <Button
                        text="Add"
                        style={'py-2'}
                        disabled={inputValue === ''}
                        onPress={addTodo}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}