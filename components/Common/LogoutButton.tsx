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
            style={tailwind('flex flex-row p-2 rounded-full bg-rose-500 mr-4')}
        >
            <Text style={tailwind('mr-2 text-sm text-white font-semibold text-center')}>
                Logout
            </Text>

            <IconDoor color={'#fff'} size={16}/>
        </TouchableOpacity>
    )
}