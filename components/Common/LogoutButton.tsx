import {IconDoor, IconHeart} from "tabler-icons-react-native";
import {TouchableOpacity, Text} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";
import {useUserStore} from "../../store/zustand";

export default function LogoutButton() {
    const tailwind = useTailwind();
    const hasUser = useUserStore(state => state.token);
    const logoutUser = useUserStore(state => state.logout)

    return !!hasUser && (
        <TouchableOpacity
            onPress={() => logoutUser()}
            style={tailwind('flex flex-row items-center mr-4 p-2 border border-rose-500 rounded-xl')}
        >
            <Text style={tailwind('mr-2 text-sm text-rose-500 font-semibold text-center')}>
                Logout
            </Text>

            <IconDoor color={'#f43f5e'} size={16}/>
        </TouchableOpacity>
    )
}