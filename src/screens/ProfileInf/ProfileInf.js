
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import Footer from "../../components/Footer/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function ProfileInf() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("currentUser");
      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      {/* Header */}
      <View className="flex-row justify-between items-center mx-4 mt-6">
        <Logo />
        <Text className="text-white text-3xl font-bold">Profile</Text>
        <SearchBar />
      </View>

      <StatusBar style="light" />

      {/* Profile Content */}
      <ScrollView className="flex-1 p-6">
        {/* Avatar + Name */}
        <View className="items-center mb-6">
          <Image source={user.avatar} className="w-36 h-36 rounded-full" />

          <Text className="text-white text-3xl font-bold mt-3">{user.name}</Text>
          <Text className="text-gray-400 text-lg">@{user.username}</Text>
        </View>

        {/* User Information */}
        <View className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto">
          <Text className="text-white text-xl font-bold mb-10">User Information</Text>

          <View className="space-y-8">
            {[
              { label: "📞 Phone", value: user.phone },
              { label: "🎂 BirthDay", value: user.dob },
              { label: "🧑 Gender", value: user.gender === "male" ? "Male" : "Female" },
              { label: "📍 Address", value: user.address },
              { label: "📅 Created At", value: new Date(user.createdAt).toLocaleDateString() },
            ].map((item, index) => (
              <View key={index} className="flex-row justify-between items-center w-full border-b border-gray-700 pb-2">
                <Text className="text-gray-400 text-lg font-medium flex-1">{item.label}:</Text>
                <Text className="text-gray-200 text-lg flex-1 text-right">{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Nút Update */}
          <TouchableOpacity className="mt-6 bg-orange-500 py-2 rounded-lg w-full"
            onPress={() => navigation.navigate("UpdateProfile")}
          
          >
            
            <Text className="text-white text-center text-lg font-semibold">Update</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>


      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
}
