import { SafeAreaView, StatusBar, View } from "react-native";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Text } from "react-native";
import TrendingMovies from "../../components/TrendingMovies/TrendingMovies";
import { ScrollView } from "react-native";
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
            >
                <TrendingMovies />
            </ScrollView>
        </View >
    );
}