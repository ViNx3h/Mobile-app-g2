// TrendingMovies.js
import React from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { trendingMovies } from "./data";
const { width } = Dimensions.get("window");


export default function TrendingMovies() {
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <FlatList
                data={trendingMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="mx-2">
                        <Image
                            source={
                                typeof item.image === "string"
                                    ? { uri: item.image } // Hình ảnh online
                                    : item.image // Hình ảnh local (require)
                            } style={{ width: width * 1, height: 350, borderRadius: 10 }}
                        />
                        <Text className="text-white text-center mt-2">{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
