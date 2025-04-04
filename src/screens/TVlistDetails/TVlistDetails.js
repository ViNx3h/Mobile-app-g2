import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchTvDetail } from "../../services/tvDetails";
import Trailer from "../../components/Trailer/Trailer";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Footer from "../../components/Footer/Footer";

export default function TVlistDetails() {
    const route = useRoute();
    const { tvId } = route.params;
    const [tvDetail, setTVDetail] = useState(null);

    useEffect(() => {
        const getTVDetail = async () => {
            const data = await fetchTvDetail(tvId);
            setTVDetail(data);
        };
        getTVDetail();
    }, [tvId]);

    if (!tvDetail) {
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
            <ScrollView>
                {/* TV Show Poster */}
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${tvDetail.poster_path}` }}
                    style={{ width: "100%", height: 300 }}
                />
                <View className="p-4">
                    {/* Title */}
                    <Text className="text-white text-2xl font-bold">{tvDetail.name}</Text>

                    {/* First Air Date & Number of Seasons */}
                    <Text className="text-gray-400 text-lg">
                        {tvDetail.first_air_date} • {tvDetail.number_of_seasons} Seasons
                    </Text>

                    {/* Genres */}
                    <Text className="text-gray-400 text-sm mt-2">
                        {tvDetail.genres.map((genre) => genre.name).join(", ")}
                    </Text>

                    {/* Vote Average */}
                    <Text className="text-yellow-400 text-lg font-bold mt-2">
                        ⭐ {tvDetail.vote_average.toFixed(1)} ({tvDetail.vote_count} votes)
                    </Text>

                    {/* Overview */}
                    <Text className="text-white mt-2">{tvDetail.overview}</Text>
                    <Trailer movieId={tvId} genre="tv" />
                </View>
                {/* Footer nằm ở cuối nội dung */}
                <Footer />
            </ScrollView>
        </View>
    );
}
