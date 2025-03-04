import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Dimensions } from "react-native";
import { fetchGenres, fetchMoviesByGenre } from "../../services/genre";
import Logo from "../../components/Logo/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const itemSize = (width - 40) / 3; // Trừ padding rồi chia 3

export default function GenreList() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

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
                <Text className="text-white text-3xl font-bold">Genre List</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}
                    >
                        <View className="bg-neutral-700 rounded-2xl shadow-lg p-4 m-2" style={{ width: itemSize, height: 220 }}>
                            <Image
                                source={{
                                    uri: item.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                        : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                                }}
                                style={{ width: itemSize - 20, height: 160, borderRadius: 10 }}
                                resizeMode="cover"
                            />
                            <Text className="text-white text-sm mt-2 text-center">{item.title}</Text>
                            <Text className="text-gray-400 text-xs">{item.release_date}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={<Footer />}
            />
        </View>
    );
}
