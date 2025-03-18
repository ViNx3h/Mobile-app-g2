import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      const data = await AsyncStorage.getItem("userProfile");
      if (!data) {
        Alert.alert("Error", "No user data found! Please register.");
        return;
      }

      const userList = JSON.parse(data);
      const foundUser = userList.find(
        (user) => user.phone.trim() === phone.trim()
      );

      if (!foundUser) {
        Alert.alert("Error", "Phone number does not exist!");
        return;
      }

      Alert.alert("Success", `Your password is: ${foundUser.password}`);
      navigation.replace("SignIn");
    } catch (error) {
      console.error("Error processing password reset:", error);
      Alert.alert("Error", "An error occurred, please try again!");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-900">
      <Text className="text-2xl font-bold text-white mb-5">Quên Mật Khẩu</Text>

      <TextInput
        className="w-full h-12 border border-gray-700 bg-gray-800 rounded-lg px-4 text-white mb-4"
        placeholder="Enter your phone number..."
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TouchableOpacity
        className="w-full h-12 bg-blue-500 rounded-lg justify-center items-center mt-2"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-lg font-bold">Recover Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.replace("SignIn")}
      >
        <Text className="text-gray-400">Return to login</Text>
      </TouchableOpacity>
    </View>
  );
}
