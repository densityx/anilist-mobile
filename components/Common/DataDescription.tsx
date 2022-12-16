import {TouchableOpacity, useWindowDimensions, View} from "react-native";
import RenderHtml from "react-native-render-html";
import {IconChevronDown} from "tabler-icons-react-native";
import Card from "./Card";
import React, {useState} from "react";
import {useTailwind} from "tailwind-rn";
import {useUserStore} from "../../store/zustand";

export default function DataDescription({media}) {
    const tailwind = useTailwind();
    const {width} = useWindowDimensions();
    const [descriptionExpand, setDescriptionExpand] = useState(false);
    const theme = useUserStore(state => state.theme)

    return (
        <Card styles={'mt-4 bg-zinc-100 dark:bg-zinc-700'}>
            {!!media?.description && (
                <TouchableOpacity
                    style={tailwind(`relative flex flex-row items-center text-white ${descriptionExpand ? 'h-auto' : 'h-[60px]'}`)}
                    onPress={() => setDescriptionExpand(!descriptionExpand)}
                >
                    <View style={tailwind(`${descriptionExpand ? 'w-full' : 'w-11/12'}`)}>
                        <RenderHtml
                            contentWidth={width}
                            source={{html: media?.description}}
                            tagsStyles={{
                                body: {
                                    color: theme === 'dark' ? '#a1a1aa' : '#27272a',
                                }
                            }}
                        />
                    </View>

                    {!descriptionExpand && (
                        <IconChevronDown color={'#a1a1aa'} size={16}/>
                    )}
                </TouchableOpacity>
            )}
        </Card>
    )
}