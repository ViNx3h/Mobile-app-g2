import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchMovieDetail } from "../../services/movieDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import Trailer from "../../components/Trailer/Trailer";
import Footer from "../../components/Footer/Footer";

export default function MovieDetails() {
    const route = useRoute();
    const { movieId } = route.params;
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        const getMovieDetail = async () => {
            const data = await fetchMovieDetail(movieId);
            setMovieDetail(data);
        };
        getMovieDetail();
    }, [movieId]);

    if (!movieDetail) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Header */}
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">
                    Movies
                </Text>
                <SearchBar />
            </SafeAreaView>

            {/* Nội dung chính */}
            <ScrollView className="flex-1">
                {/* Movie Poster */}
                <Image
                    source={{
                        uri: movieDetail.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`
                    }}
                    style={{ width: "100%", height: 300 }}
                />

                <View className="p-4">
                    <Text className="text-white text-2xl font-bold">{movieDetail.title}</Text>
                    <Text className="text-gray-400 text-lg">
                        {movieDetail.release_date} • {movieDetail.runtime} min
                    </Text>
                    <Text className="text-gray-400 text-sm mt-2">
                        {movieDetail.genres.map((genre) => genre.name).join(", ")}
                    </Text>
                    <Text className="text-yellow-400 text-lg font-bold mt-2">
                        ⭐ {movieDetail.vote_average.toFixed(1)} ({movieDetail.vote_count} votes)
                    </Text>
                    <Text className="text-white mt-2">{movieDetail.overview}</Text>
                    <Text className="text-gray-400 mt-4">
                        <Text className="text-white font-bold">Production: </Text>
                        {movieDetail.production_companies.map((comp) => comp.name).join(", ")}
                    </Text>
                    <Text className="text-gray-400">
                        <Text className="text-white font-bold">Language: </Text>
                        {movieDetail.original_language.toUpperCase()}
                    </Text>
                    <Trailer movieId={movieId} />
                </View>

                {/* Footer nằm ở cuối nội dung */}
                <Footer />
            </ScrollView>
        </View>
    );
}
