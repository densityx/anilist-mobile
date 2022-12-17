import create from 'zustand';
import {devtools, persist} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useInfoStore = create(persist((set) => ({
    dependencies: [
        'React Native Expo',
        'React Navigation',
        'Zustand',
        'TypeScript',
        'Tailwind CSS',
        'AsyncStorage',
        'WebView / YouTube',
        'Reanimated',
    ],
    tools: [
        'WebStorm',
        'Expo Go on Android',
        'Chrome',
        'IOS Simulator'
    ]
}), {
    name: 'info-storage',
    getStorage: () => AsyncStorage
}))

const useUserStore = create(devtools(persist((set) => ({
    theme: 'dark',
    token: null,
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
    })),
    setToken: (param) => set({token: param}),
    logout: () => set({token: null})
}), {
    name: 'user-storage',
    getStorage: () => AsyncStorage
})));

const useTodoStore = create(persist((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({
        todos: [...state.todos, todo]
    })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
    }))
}), {
    name: 'todo-storage',
    getStorage: () => AsyncStorage
}));

export {useInfoStore, useUserStore, useTodoStore};