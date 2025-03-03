import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function Logo() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const navigation = useNavigation();
    const handleLogout = () => {
        alert("Logged out");
        navigation.navigate("SignIn");
        setIsLoggedIn(false)
    };
    return (
        <View className="relative z-50">
            {/* Menu Icon */}
            <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
                <MaterialIcons name="menu" size={28} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {isMenuVisible && (
                <View className="absolute top-10 left-0 bg-gray-800 p-3 rounded-md shadow-lg w-40">
                    {isLoggedIn ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.replace("Home")}>
                                <Text className="text-white text-sm py-1">Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("ProfileInf")}>
                                <Text className="text-white text-sm py-1">Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("FavList")}>
                                <Text className="text-white text-sm py-1">Favorite Movies</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("ActorList")}>
                                <Text className="text-white text-sm py-1">Actors</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("GenreMovie")}>
                                <Text className="text-white text-sm py-1">Genre</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("HisOrderList")}>
                                <Text className="text-white text-sm py-1">History Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout}>
                                <Text className="text-red-500 text-sm py-1">Log Out</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                            <Text className="text-white text-sm py-1">SignIn</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
