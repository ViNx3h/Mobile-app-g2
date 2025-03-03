import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";
import { fetchTrailer } from "../../services/getTrailer";

export default function Trailer({ movieId }) {
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTrailer = async () => {
            const key = await fetchTrailer(movieId);
            setTrailerKey(key);
            setLoading(false);
        };
        getTrailer();
    }, [movieId]);

    if (loading) {
        return (
            <View className="w-full justify-center items-center py-5">
                <ActivityIndicator size="large" color="#ff0000" />
                <Text className="text-white mt-4">Loading trailer...</Text>
            </View>
        );
    }

    if (!trailerKey) {
        return (
            <View className="w-full justify-center items-center py-5">
                <Text className="text-gray-400">There is no trailer for this movie...</Text>
            </View>
        );
    }

    return (
        <View className="mt-5">
            <Text className="text-white text-lg font-bold mb-3">🎬 Official Trailer</Text>
            <View className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                <WebView
                    source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsFullscreenVideo
                    className="flex-1"
                />
            </View>
        </View>
    );
}
