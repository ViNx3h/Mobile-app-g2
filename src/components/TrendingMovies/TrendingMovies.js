import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { fetchTrendingData } from "../../services/trending";

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
        <View className="mb-8 w-full items-center flex-col">
            {/* Centered Trending Text */}
            <View className="w-full items-center">
                <Text className="text-white text-xl text-center mb-5">Trending</Text>
            </View>

            {/* Horizontal Movie List */}
            <FlatList
                data={trendingMovies.slice(0, 5)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="max-w-full w-screen">
                        {item.poster_path ? (
                            <Image
                                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                                className="h-[350px] w-full object-contain border-r-8"
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
