import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import TrendingMovies from "../../components/TrendingMovies/TrendingMovies";
import MovieList from "../MovieList/MovieList";
import TVList from "../TVList/TVList";
import Footer from "../../components/Footer/Footer";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">
                    Movies
                </Text>
                <SearchBar />
            </SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                className="flex-col"
            >
                <View>
                    <TrendingMovies />
                </View>
                <View className="mb-2">
                    < MovieList />
                </View>
                <View>
                    <TVList />
                </View>
                <Footer />
            </ScrollView>
        </View >
    );
}