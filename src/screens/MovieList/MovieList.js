import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { fetchPopularMovie } from '../../services/listMovies';

export default function MovieList() {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const getTrendingData = async () => {
            const data = await fetchPopularMovie();
            setMovieList(data);
        };
        getTrendingData();
    }, []);

    return (
        <View className="items-center w-full flex-col">
            {/* Title */}
            <Text className="text-white text-xl mx-4">MovieList</Text>

            {/* Horizontal Movie List */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movieList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View className="bg-neutral-700 rounded-2xl shadow-lg p-4 m-2 w-44 h-60 items-center">
                            {/* Movie Poster */}
                            <Image
                                source={{
                                    uri: item.poster_path ?
                                        `https://image.tmdb.org/t/p/w200${item.poster_path}` :
                                        `https://image.tmdb.org/t/p/w200${item.backdrop_path}`
                                }}
                                style={{ width: 120, height: 160, borderRadius: 10 }}
                            />
                            {/* Movie Title (Truncated) */}
                            <Text
                                className="text-white mt-2 text-base font-semibold text-center"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.title}
                            </Text>

                            {/* Release Date */}
                            <Text className="text-gray-400 text-sm">{item.release_date}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
