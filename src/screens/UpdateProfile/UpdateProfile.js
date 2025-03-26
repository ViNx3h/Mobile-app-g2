import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

export default function UpdateProfile() {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
    });

    const navigation = useNavigation(); // Điều hướng
    const [selectedGender, setSelectedGender] = useState(user.gender || "male");
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AsyncStorage.getItem("currentUser");
                if (data) {
                    setUser(JSON.parse(data));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            await AsyncStorage.setItem("currentUser", JSON.stringify(user));
            Alert.alert("Success", "Profile updated successfully!", [
                { text: "OK", onPress: () => navigation.navigate("ProfileInf") }
            ]);
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "An error occurred while updating your profile.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-900  ">
            <View className="flex-row justify-between items-center mx-4 mt-6">
                <Logo />
                <Text className="text-white text-3xl font-bold">update Profile</Text>
                <SearchBar />
            </View>
            <SafeAreaView className="flex-1 bg-gray-900 px-6 pt-10">
                {/* Header */}





                {/* Name */}
                <Text className="text-white text-xl font-bold mb-2">🔘 Full Name: </Text>

                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })}
                    className="bg-gray-800 text-white p-4 rounded-lg mb-9"
                />

                {/* Phone */}
                <Text className="text-white text-xl font-bold mb-2">📞 Phone: </Text>
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    value={user.phone}
                    onChangeText={(text) => setUser({ ...user, phone: text })}
                    className="bg-gray-800 text-white p-4 rounded-lg mb-9"
                    keyboardType="phone-pad"
                />

                {/* Date of Birth */}
                <Text className="text-white text-xl font-bold mb-2">🎂 BirthDay: </Text>
                <TextInput
                    label="Date of Birth"
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    placeholderTextColor="#888"
                    value={user.dob}
                    onChangeText={(text) => setUser({ ...user, dob: text })}
                    className="bg-gray-800 text-white p-4 rounded-lg mb-9"
                />

                {/* Gender */}
                <Text className="text-white text-xl font-bold mb-2">🧑 Gender: </Text>
                <View className="bg-gray-800 rounded-lg mb-9">
                    <Picker
                        selectedValue={selectedGender}
                        onValueChange={(itemValue) => {
                            setSelectedGender(itemValue);
                            setUser({ ...user, gender: itemValue });
                        }}
                        style={{ color: "white" }} // Đổi màu chữ cho phù hợp với dark mode
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>

                {/* Address */}
                <Text className="text-white text-xl font-bold mb-2">📍 Address: </Text>
                <TextInput
                    placeholder="Address"
                    placeholderTextColor="#888"
                    value={user.address}
                    onChangeText={(text) => setUser({ ...user, address: text })}
                    className="bg-gray-800 text-white p-4 rounded-lg mb-6"
                />

                {/* Submit Button */}
                <View className="flex items-center mt-4">
                    <TouchableOpacity
                        onPress={handleUpdateProfile}
                        className=" bg-orange-500 p-3 rounded-lg w-5/12"
                    >
                        <Text className="text-white text-center text-lg font-bold">Update</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
            < Footer/>
        </SafeAreaView>
    );
}
