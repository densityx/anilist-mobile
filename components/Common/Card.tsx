import {View} from "react-native";
import {useTailwind} from "tailwind-rn";

export default function Card({children, styles = null}) {
    const tailwind = useTailwind();

    return (
        <View style={tailwind(`bg-white dark:bg-zinc-800 p-4 rounded-xl ${styles}`)}>
            {children}
        </View>
    )
}