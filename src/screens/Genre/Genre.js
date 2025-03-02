import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { fetchGenres, fetchMoviesByGenre } from "../../services/genre";
import Logo from "../../components/Logo/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function GenreList() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            const data = await fetchGenres();
            setGenres(data);
        };
        getGenres();
    }, []);

    const handleSelectGenre = async (genreId) => {
        setSelectedGenre(genreId);
        const moviesData = await fetchMoviesByGenre(genreId);
        setMovies(moviesData);
    };

    return (
        <View className="flex-1 bg-neutral-800">
            {/*Logo and Search Bar */}
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">
                    Movies
                </Text>
                <SearchBar />
            </SafeAreaView>
            <View className="pt-4">
                <View className="p-4">
                    <FlatList
                        data={genres}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className={`px-3 py-2 mx-1 rounded-md ${selectedGenre === item.id ? "bg-red-500" : "bg-gray-700"
                                    }`}
                                onPress={() => handleSelectGenre(item.id)}
                            >
                                <Text className="text-white">{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {selectedGenre && (
                    <View>
                        <FlatList
                            data={movies}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <View className="bg-neutral-700 rounded-2xl shadow-lg p-4 m-2 w-44 h-60 items-center">
                                        <Image
                                            source={{
                                                uri: item.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                    : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                                            }}
                                            style={{ width: 120, height: 160, borderRadius: 10 }}
                                            resizeMode="cover"
                                        />
                                        <Text className="text-white text-sm mt-2 text-center">{item.title}</Text>
                                        <Text className="text-gray-400 text-sm">{item.release_date}</Text>
                                    </View>
                                </TouchableOpacity>

                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}
