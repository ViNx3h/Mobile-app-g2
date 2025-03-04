import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

const { width } = Dimensions.get("window");
const itemSize = width / 3 - 20; // Chia 3 cột, có padding

export default function ActorList() {
    const navigation = useNavigation();
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/person/popular?api_key=fd72fbb755f23fa49c72918520fd2939");
                const data = await response.json();
                setActors(data.results); // Lấy danh sách diễn viên
            } catch (error) {
                console.error("Lỗi khi tải diễn viên:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActors();
    }, []);

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Header */}
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">Actors</Text>
                <SearchBar />
            </SafeAreaView>

            {/* Title */}
            <Text className="text-white text-xl mx-4 mb-2 text-center">Popular Actors</Text>

            {/* Hiển thị loading */}
            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={actors}
                    numColumns={3} // Hiển thị 3 cột
                    keyExtractor={(item) => item.id.toString()} // Chuyển id về string
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ width: itemSize, margin: 5 }}
                            onPress={() => navigation.navigate("ActorInf", { actorId: item.id })} // Chuyển qua màn ActorInf
                        >
                            <View className="bg-neutral-700 rounded-2xl shadow-lg p-2 items-center">
                                {/* Ảnh diễn viên */}
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                                    style={{ width: itemSize - 20, height: 120, borderRadius: 10 }}
                                />
                                {/* Tên diễn viên (giới hạn ký tự + chiều cao cố định) */}
                                <Text
                                    className="text-white mt-2 text-sm font-semibold text-center"
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{ height: 40 }} // Đặt chiều cao cố định để giữ bố cục đồng đều
                                >
                                    {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={<Footer />} // Footer di chuyển theo danh sách
                />
            )}
        </View>
    );
}
