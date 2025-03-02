import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import TrendingMovies from "../../components/TrendingMovies/TrendingMovies";
import MovieList from "../MovieList/MovieList";
import TVList from "../TVList/TVList";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-neutral-800">
            {/*Logo and Search Bar */}
            <SafeAreaView className="flex-row justify-between items-center mx-4">
                <StatusBar style="light" />
                <Logo />
                <Text className="text-white text-3xl font-bold">
                    Movies
                </Text>
                <SearchBar />
            </SafeAreaView>
            {/*TrendingMovies*/}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: 10 }}
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
            </ScrollView>
        </View >
    );
}