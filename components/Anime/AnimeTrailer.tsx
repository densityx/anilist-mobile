import {Image, Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import React, {useState} from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {useTailwind} from "tailwind-rn";

export default function AnimeTrailer({anime}) {
    const [play, setPlay] = useState(false);
    const tailwind = useTailwind();

    return !!anime?.trailer?.thumbnail && (
        <View style={tailwind('mt-4')}>
            <Text style={tailwind('text-sm text-zinc-600 dark:text-zinc-500 font-medium')}>
                Trailer
            </Text>

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


            {/*<YouTube*/}
            {/*    apiKey={'AIzaSyBUdAH3EKd1-MgF4Hl22aewTUzW_jV73ng'}*/}
            {/*    videoId={anime?.trailer?.id} // The YouTube video ID*/}
            {/*    play // control playback of video with true/false*/}
            {/*    fullscreen // control whether the video should play in fullscreen or inline*/}
            {/*    loop // control whether the video should loop when ended*/}
            {/*    // onReady={e => setState({isReady: true})}*/}
            {/*    // onChangeState={e => setState({status: e.state})}*/}
            {/*    // onChangeQuality={e => setState({quality: e.quality})}*/}
            {/*    // onError={e => setState({error: e.error})}*/}
            {/*    style={{alignSelf: 'stretch', height: 300}}*/}
            {/*/>*/}
        </View>
    )
}