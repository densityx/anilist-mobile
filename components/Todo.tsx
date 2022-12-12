import React, {useState} from "react";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";

export default function Todo() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Visit the morning market :)",
            done: false,
        },
        {
            id: 2,
            title: "Learn React Native",
            done: false,
        },
    ]);

    const toggleTodo = (id) => {
        console.log(id, 'toggling')
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
            return todo;
        });

        setTodos(newTodos);
    }

    const saveNewTodo = () => {
        if (newTodo.length > 0) {
            setTodos([...todos, {
                id: Math.random(),
                title: newTodo,
                done: false,
            }]);

            setNewTodo('');
        }
    }

    const markAllTodoComplete = () => {
        const newTodos = todos.map((todo) => {
            todo.done = true;
            return todo;
        });

        setTodos(newTodos);
    }

    const archiveCompletedTodo = () => {
        const newTodos = todos.filter((todo) => {
            return !todo.done;
        });

        setTodos(newTodos);
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>Todo</Text>

                    {todos.filter(todo => !todo.done).length ? (
                        <Pressable style={styles.button} onPress={markAllTodoComplete}>
                            <Text style={styles.buttonText}>
                                Mark All Complete
                            </Text>
                        </Pressable>
                    ) : null}
                </View>

                {todos.filter(todo => !todo.done).length ? (
                    todos.filter(todo => !todo.done).map(todo => (
                        <Pressable onPress={() => toggleTodo(todo.id)} key={todo.id} style={styles.item}>
                            <Text style={styles.text}>{todo.done ? '✅' : '☑️'} {todo.title}</Text>
                        </Pressable>
                    ))
                ) : (
                    <View style={{...styles.paper, ...styles.mt8}}>
                        <Text style={styles.text}>No todos left!</Text>
                    </View>
                )}

                {newTodo.length ? (
                    <Pressable style={styles.item}>
                        <Text style={styles.text}>{'☑️ ' + newTodo}</Text>
                    </Pressable>
                ) : <></>}

                <TextInput
                    style={{...styles.input, ...styles.mt8}}
                    placeholder={'Enter new Todo'}
                    onChangeText={(text) => setNewTodo(text)}
                    value={newTodo}
                    onSubmitEditing={saveNewTodo}
                />
            </View>

            <View style={styles.mt16}>

                <View style={styles.headingWrapper}>
                    <Text style={styles.heading}>
                        Completed Todo
                    </Text>

                    {todos.filter(todo => todo.done).length ? (
                        <Pressable style={styles.button} onPress={archiveCompletedTodo}>
                            <Text style={styles.buttonText}>
                                Archive Completed Todo
                            </Text>
                        </Pressable>
                    ) : null}
                </View>

                {todos.filter(todo => todo.done).length ? (
                    todos.filter(todo => todo.done).map(todo => (
                        <Pressable onPress={() => toggleTodo(todo.id)} key={todo.id} style={styles.item}>
                            <Text style={styles.text}>{todo.done ? '✅' : '☑️'} {todo.title}</Text>
                        </Pressable>
                    ))
                ) : (
                    <View style={{...styles.paper, ...styles.mt8}}>
                        <Text style={styles.text}>No todos completed!</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heading: {
        fontWeight: 'bold',
        color: '#737373',
    },
    container: {
        backgroundColor: 'white',
        padding: 8,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fbcfe8',
        justifyContent: 'space-between',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    paper: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#e7e5e4',
    },
    text: {
        fontSize: 16,
    },
    input: {
        padding: 8,
        borderRadius: 8,
        borderColor: '#737373',
        borderWidth: 1,
    },
    button: {
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#0ea5e9',
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    },
    mt8: {
        marginTop: 8,
    },
    mt16: {
        marginTop: 16,
    }
})