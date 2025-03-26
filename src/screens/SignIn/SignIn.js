import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const data = await AsyncStorage.getItem("userProfile");
      if (!data) {
        Alert.alert("Error", "User data not found! Please register first.");
        return;
      }

      const userList = JSON.parse(data);
      const foundUser = userList.find(
        (user) =>
          user.username.trim().toLowerCase() === username.trim().toLowerCase()
      );
      if (!foundUser) {
        Alert.alert("Error", "Not Found UserName");
        return;
      }

      if (foundUser.password !== password) {
        Alert.alert("Error", "Wrong Password");
        return;
      }

      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));

      if (navigation && navigation.replace) {
        navigation.replace("Home");
      } else {
        console.error("Navigation not ready!");
      }
    } catch (error) {
      console.error("Error processing login:", error);
      Alert.alert("Error", "An error occurred, please try again!");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-900">
      <Text className="text-2xl font-bold text-white mb-5">Log In</Text>
      <TextInput
        className="w-full h-12 border border-gray-700 bg-gray-800 rounded-lg px-4 text-white mb-4"
        placeholder="Enter username..."
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full h-12 border border-gray-700 bg-gray-800 rounded-lg px-4 text-white mb-4"
        placeholder="Enter password..."
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="w-full h-12 bg-red-500 rounded-lg justify-center items-center mt-2"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-bold">Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text className="text-blue-400 text-sm">Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text className="text-blue-400 text-sm">Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}
