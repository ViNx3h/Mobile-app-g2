import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Logo from "../../components/Logo/Logo";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939"; // Thay bằng API key của bạn

export default function SearchScreen() {
  const route = useRoute();
  const { query } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <View className="bg-neutral-900 flex-1">
      {/* Header */}
      <SafeAreaView className="flex-row items-center justify-between px-4 py-3 border-b border-gray-700">
        <StatusBar style="light" />
        <Logo />
        <Text className="text-white text-xl font-bold">Movies</Text>
        <SearchBar />
      </SafeAreaView>

      {/* Nội dung */}
      <View className="flex-1 px-4 py-3">
        <Text className="text-white text-lg font-semibold mb-4">
          Search results: "{query}"
        </Text>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : movies.length > 0 ? (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}
                className="flex-row items-center bg-gray-800 p-3 mb-3 rounded-lg shadow-md hover:bg-gray-700"
              >
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : "https://via.placeholder.com/80x120?text=No+Image",
                  }}
                  className="w-20 h-30 rounded-lg shadow-lg"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {item.release_date || "Không có ngày phát hành"}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={<Footer />}
          />
        ) : (
          <Text className="text-gray-400 text-center text-lg">
            No movies found.
          </Text>
        )}
      </View>
    </View>
  );
}
