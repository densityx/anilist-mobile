import create from 'zustand';
import {devtools, persist} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create(devtools(persist(((set) => ({
    theme: 'dark',
    token: null,
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
    })),
    setToken: (param) => set({token: param}),
    logout: () => set({token: null})
})), {
    name: 'user-storage',
    getStorage: () => AsyncStorage
})));

export {useUserStore};