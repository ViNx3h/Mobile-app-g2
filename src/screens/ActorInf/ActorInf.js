import {
  View, Text, Image, ActivityIndicator, ScrollView, SafeAreaView,
  StatusBar, FlatList, TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

export default function ActorInf() {
  const route = useRoute();
  const navigation = useNavigation();
  const { actorId } = route.params;
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=fd72fbb755f23fa49c72918520fd2939&append_to_response=movie_credits`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch actor details");
        }
        const data = await response.json();
        setActor(data);
      } catch (error) {
        console.error("Error fetching actor details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      {/* Header */}
      <SafeAreaView style={{ position: "relative", zIndex: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16 }}>
        <StatusBar style="light" />
        <Logo />
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Actor Details</Text>
        <SearchBar />
      </SafeAreaView>

      {/* Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 16 }}>
        {/* Ảnh Diễn Viên */}
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }}
          style={{ width: "100%", height: 300, borderRadius: 15 }}
        />

        {/* Tên & Thông Tin */}
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{actor.name}</Text>
        <Text style={{ color: "gray", fontSize: 16 }}>📈 Popularity: {actor.popularity}</Text>
        <Text style={{ color: "gray", fontSize: 16, marginTop: 5 }}>🎂 Birthday: {actor.birthday || "Unknown"}</Text>

        {/* Sửa Birthplace thành Home 🏠 */}
        {actor.place_of_birth && (
          <Text style={{ color: "gray", fontSize: 16 }}>🏠 Home: {actor.place_of_birth}</Text>
        )}

        <Text style={{ color: "gray", fontSize: 16 }}>⚧ Gender: {actor.gender === 1 ? "Female" : "Male"}</Text>
        <Text style={{ color: "gray", fontSize: 16 }}>🎭 Department: {actor.known_for_department}</Text>

        {/* Tiểu sử (Biography) */}
        {actor.biography && (
          <>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginTop: 20 }}>📝 Biography:</Text>
            <Text style={{ color: "gray", fontSize: 16, textAlign: "justify", marginTop: 5 }}>
              {actor.biography}
            </Text>
          </>
        )}

        {/* Featured Movies */}
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginTop: 20 }}>🎬 Featured Movies:</Text>

        <FlatList
          data={actor.movie_credits.cast}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: 120, margin: 5 }} // Căn chỉnh khoảng cách giữa các item
              onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}
            >
              {/* Card Container */}
              <View className="bg-neutral-700 rounded-2xl shadow-lg p-2 items-center">
                {/* Ảnh Poster */}
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                  style={{ width: 100, height: 150, borderRadius: 10 }}
                  resizeMode="cover"
                />

                {/* Tiêu đề Phim (giới hạn ký tự + chiều cao cố định) */}
                <Text
                  className="text-white mt-2 text-sm font-semibold text-center"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ width: 100, height: 40 }} // Đặt chiều cao cố định để giữ bố cục đồng đều
                >
                  {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />


      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
}
