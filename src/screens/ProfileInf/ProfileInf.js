import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer/Footer";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function ProfileInf() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("currentUser");
        if (data) {
          setUser(JSON.parse(data));
          // console.log(data);

        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#ff4500" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-white text-lg">No user data found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <SafeAreaView style={{ position: "relative", zIndex: 50 }} className="flex-row justify-between items-center mx-4">
        <StatusBar style="light" />
        <Logo />
        <Text className="text-white text-3xl font-bold">Profile</Text>
        <SearchBar />
      </SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ScrollView className="flex-1 p-6 h-10">
        {/* Avatar + Name */}
        <View className="items-center mb-6 d-flex">
          <Image

            source={user.avatar}
            className="w-36 h-36 rounded-full border-4 border-gray-700 shadow-lg"
          />

          <Text className="text-white text-3xl font-bold mt-3">{user.name}</Text>
          <Text className="text-gray-400 text-lg">@{user.username}</Text>
        </View>

        {/* User Information */}
        <View className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <Text className="text-white text-xl font-semibold mb-4">User Information</Text>

          {/* Phone */}
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-300 text-xl p-2">📞Phone: </Text>
            <Text className="text-gray-300 text-xl">{user.phone}</Text>
          </View>

          {/* DOB */}
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-300 text-xl p-2">🎂BirthDay : </Text>
            <Text className="text-gray-300 text-xl">{user.dob}</Text>
          </View>

          {/* Gender */}
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-300 text-xl p-2">🧑Gender: </Text>
            <Text className="text-gray-300 text-xl">{user.gender === "male" ? "Male" : "Female"}</Text>
          </View>

          {/* Address */}
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-300 text-xl p-2">📍Address  :</Text>
            <Text className="text-gray-300 text-xl">{user.address}</Text>
          </View>

          {/* Joined Date */}
          <View className="flex-row items-center">
            <Text className="text-gray-300 text-xl p-2">📅Create Account :</Text>
            <Text className="text-gray-300 text-xl">{new Date(user.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

      </ScrollView>

      <Footer />
    </SafeAreaView>


  );
}
