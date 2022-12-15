import create from 'zustand';
import {devtools, persist} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({bears: state.bears + 1})),
    removeAllBears: () => set({bears: 0})
}));

const useUserStore = create(devtools(persist(((set) => ({
    token: null,
    setToken: (param) => set({token: param}),
    logout: () => set({token: null})
})), {
    name: 'user-storage',
    getStorage: () => AsyncStorage
})));

export {useBearStore, useUserStore};