import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Logo from "../../components/Logo/Logo";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939"; // Thay bằng API key của bạn

export default function SearchScreen() {
  const route = useRoute();
  const { query } = route.params; // Nhận query từ SearchBar
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook điều hướng

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
        console.error("Error when searching for a movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <View className="bg-neutral-800" style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <SafeAreaView
        style={{ position: "relative", zIndex: 50 }}
        className="flex-row justify-between items-center mx-4"
      >
        <StatusBar style="light" />
        <Logo />
        <Text className="text-white text-3xl font-bold">Movies</Text>
        <SearchBar />
      </SafeAreaView>

      {/* nội dung */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          color: "white",
        }}
      >
        Search results: {query}
      </Text>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails", { movieId: item.id })
              }
            >
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : "https://via.placeholder.com/80x120?text=No+Image",
                  }}
                  style={{ width: 80, height: 120, borderRadius: 8 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {item.release_date || "No release date."}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          No movies found.
        </Text>
      )}
      <Footer />
    </View>
  );
}
