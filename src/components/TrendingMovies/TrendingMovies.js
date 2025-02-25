// TrendingMovies.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { fetchTrendingData } from "../../services/listMovies";
// import { trendingMovies } from "./data";

export default function TrendingMovies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    useEffect(() => {
        const getTrendingData = async () => {
            const data = await fetchTrendingData();
            setTrendingMovies(data);
        };
        getTrendingData();
    }, []);
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <FlatList
                data={trendingMovies.slice(0, 5)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        {item.poster_path ? (
                            <Image
                                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                                style={{ width: 380, height: 350, borderRadius: 8 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-80 bg-gray-500 rounded-lg flex items-center justify-center">
                                <Text className="text-white text-lg">No Image</Text>
                            </View>
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
