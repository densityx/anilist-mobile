import {TouchableOpacity, useWindowDimensions, View} from "react-native";
import RenderHtml from "react-native-render-html";
import {IconChevronDown} from "tabler-icons-react-native";
import Card from "./Card";
import React, {useState} from "react";
import {useTailwind} from "tailwind-rn";

export default function DataDescription({media}) {
    const tailwind = useTailwind();
    const {width} = useWindowDimensions();
    const [descriptionExpand, setDescriptionExpand] = useState(false);

    return (
        <Card styles={'mt-4 bg-zinc-700'}>
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
                                    color: '#a1a1aa',
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