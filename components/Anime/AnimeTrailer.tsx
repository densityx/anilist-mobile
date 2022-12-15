import {Image, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import React, {useState} from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {useTailwind} from "tailwind-rn";
import Label from "../Common/Label";

export default function AnimeTrailer({anime}) {
    const [play, setPlay] = useState(false);
    const tailwind = useTailwind();

    return !!anime?.trailer?.thumbnail && (
        <View style={tailwind('mt-4')}>
            <Label>
                Trailer
            </Label>

            <View style={tailwind('mt-4')}>
                {!play ? (
                    <TouchableOpacity
                        onPress={() => setPlay(true)}
                        style={tailwind('relative flex items-center justify-center mt-2 rounded-lg overflow-hidden')}
                    >
                        <Image
                            source={{
                                uri: anime?.trailer?.thumbnail
                            }}
                            style={tailwind('w-full h-[160px]')}
                        />

                        <View
                            style={tailwind('absolute bg-zinc-400 w-full h-[160px] opacity-40')}
                        />

                        <View style={tailwind('absolute p-2 rounded-full bg-zinc-900/40')}>
                            <Svg
                                style={tailwind('w-6 h-6 text-red-400')}
                                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                                <Path d="M7 4v16l13 -8z"></Path>
                            </Svg>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <YoutubePlayer
                        height={186}
                        play={false}
                        videoId={anime?.trailer?.id}
                    />
                )}
            </View>
        </View>
    )
}