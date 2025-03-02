import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const navigation = useNavigation();

    const handleSearch = () => {
        if (query.trim() !== "") {
            navigation.navigate("SearchScreen", { query });
            setIsFocused(false);
            setQuery("");
        }
    };

    return (
        <View className="flex-row items-center">
            {isFocused ? (
                <View className="flex-row items-center bg-gray-700 px-2 py-1 rounded-md w-48">
                    <TextInput
                        className="flex-1 text-white text-sm"
                        placeholder="Search..."
                        placeholderTextColor="gray"
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                        onBlur={() => setIsFocused(false)}
                        onSubmitEditing={handleSearch} // Khi nhấn Enter
                    />
                    <TouchableOpacity onPress={() => setIsFocused(false)}>
                        <MaterialIcons name="close" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={() => setIsFocused(true)}>
                    <MaterialIcons name="search" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </View>
    );
}
