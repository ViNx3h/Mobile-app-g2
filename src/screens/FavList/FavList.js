import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { fetchFavoriteMovies } from "../../storage/api";

export default function FavList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            const favoriteMovies = await fetchFavoriteMovies();
            setMovies(favoriteMovies);
            setLoading(false);
        };
        loadMovies();
    }, []);

    // Function to render star rating based on vote_average
    const renderStars = (voteAverage) => {
        const stars = Math.round(voteAverage / 2); // Convert 10-point scale to 5-star scale
        return "⭐".repeat(stars) + "☆".repeat(5 - stars); // Add empty stars if needed
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ff6600" className="mt-10" />;
    }

    return (
        <View className="flex-1 bg-gray-900 p-4">
            <Text className="text-white text-2xl font-bold text-center mb-4">🎬 Favorite Movies</Text>
            
            {movies.length === 0 ? (
                <Text className="text-gray-400 text-center text-lg">No favorite movies</Text>
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="flex-row bg-gray-800 rounded-lg p-4 mb-3">
                            <Image
                                source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/100x150" }}
                                className="w-20 h-30 rounded-lg"
                            />
                            <View className="ml-4 flex-1">
                                <Text className="text-white text-lg font-bold">{item.title || "No title available"}</Text>
                                <Text className="text-gray-400 text-sm mt-2">📅 {item.release_date || "Unknown release date"}</Text>
                                
                                {/* Display star rating ⭐ */}
                                <Text className="text-yellow-400 text-sm mt-2">{renderStars(item.vote_average)}</Text>

                                {/* Display vote count 👤 */}
                                <Text className="text-gray-400 text-sm mt-2">👤 {item.vote_count || "0"} reviews</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
