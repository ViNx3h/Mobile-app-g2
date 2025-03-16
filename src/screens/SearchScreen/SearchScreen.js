import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939"; // Thay bằng API key của bạn

export default function SearchScreen() {
  const route = useRoute();
  const { query } = route.params; // Nhận query từ SearchBar
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(query)}`
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
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Kết quả tìm kiếm: {query}
      </Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
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
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
                <Text>{item.release_date || "Không có ngày phát hành"}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Không tìm thấy phim nào.</Text>
      )}
    </View>
  );
}
