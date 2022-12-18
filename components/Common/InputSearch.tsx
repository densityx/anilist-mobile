import {TextInput, View} from "react-native";
import {IconSearch} from "tabler-icons-react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";
import {useUserStore} from "../../store/zustand";

export default function InputSearch({term, onChangeText, placeholder, style}) {
    const tailwind = useTailwind();
    const theme = useUserStore(state => state.theme);

    return (
        <View style={tailwind('relative flex justify-center w-full')}>
            <TextInput
                style={{...tailwind('pl-8 pr-4 py-2 w-full rounded-md bg-white dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-white'), ...style}}
                placeholder={placeholder}
                value={term}
                onChangeText={onChangeText}
                placeholderTextColor={theme === 'dark' ? '#a1a1aa' : '#27272a'}
            />

            <IconSearch
                color={theme === 'dark' ? '#52525b' : '#a1a1aa'}
                style={tailwind('absolute ml-2')}
                size={16}
            />
        </View>
    )
}