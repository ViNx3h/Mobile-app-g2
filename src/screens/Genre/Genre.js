import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { fetchGenres, fetchMoviesByGenre } from "../../services/genre";
import Logo from "../../components/Logo/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

export default function GenreList() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const data = await fetchGenres();
                setGenres(data);
            } catch (err) {
                setError("Failed to load genres.");
            }
        };
        getGenres();
    }, []);

    const handleSelectGenre = async (genreId) => {
        setSelectedGenre(genreId);
        setLoading(true);
        setError(null);
        try {
            const moviesData = await fetchMoviesByGenre(genreId);
            setMovies(moviesData);
        } catch (err) {
            setError("Failed to load movies.");
        }
        setLoading(false);
    };

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Header */}
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">Movies</Text>
                <SearchBar />
            </SafeAreaView>

            {/* Danh sách phim */}
            <FlatList
                data={movies}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={() => (
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
                )}
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
                ListFooterComponent={<Footer />}
            />
        </View>
    );
}
