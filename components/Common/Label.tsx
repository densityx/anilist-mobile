import React from "react";
import {Text} from 'react-native';
import {useTailwind} from "tailwind-rn";

export default function Label({children}) {
    const tailwind = useTailwind();
    
    return (
        <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
            {children}
        </Text>
    )
}