import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

import { fetchFavoriteMovies, fetchMovieById } from "../../storage/api";
import Footer from "../../components/Footer/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
// import { fetchMovieDetail } from "../../services/movieDetails";

import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import { StatusBar } from "expo-status-bar";

export default function FavList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Initialize navigation
    const [movieDetail, setMovieDetail] = useState(null);
    const [movieId, setmovieId] = useState(null);
    useEffect(() => {
        const loadMovies = async () => {
            const favoriteMovies = await fetchFavoriteMovies();
            setMovies(favoriteMovies);
            setLoading(false);
            setmovieId(favoriteMovies[0].id);
        };
        loadMovies();
        getMovieDetail();
    }, [movieId]);


    const getMovieDetail = async () => {

        const data = await fetchMovieById(movieId);

        setMovieDetail(data);
    };



    // Function to render star rating based on vote_average
    const renderStars = (voteAverage) => {
        const stars = Math.round(voteAverage / 2); // Convert 10-point scale to 5-star scale
        return "⭐".repeat(stars) + "☆".repeat(5 - stars); // Add empty stars if needed
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ff6600" className="mt-10" />;
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900 ">
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4 mb-5">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">🎬 Favorite Movies</Text>
                <SearchBar />
            </SafeAreaView>

            {movies.length === 0 ? (
                <Text className="text-gray-400 text-center text-lg">No favorite movies</Text>
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })} // Navigate to VideoDetail
                        >
                            <View className="flex-row bg-gray-800 rounded-lg p-4 mb-3">
                                <Image
                                    source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/100x150" }}
                                    className="w-52 h-36 rounded-xl"
                                />
                                <View className="ml-6 flex-1">
                                    <Text className="text-white text-lg font-bold">{item.title || "No title available"}</Text>
                                    <Text className="text-gray-400 text-sm mt-2">📅 {item.release_date || "Unknown release date"}</Text>
                                    <Text className="text-yellow-400 text-sm mt-2">{renderStars(item.vote_average)}</Text>
                                    <Text className="text-gray-400 text-sm mt-2">👤 {item.vote_count || "0"} reviews</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Footer />
        </SafeAreaView>
    );
}