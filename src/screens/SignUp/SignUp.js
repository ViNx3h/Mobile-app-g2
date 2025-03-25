import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../components/Logo/Logo";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!name || !username || !password || !phone || !address) {
      Alert.alert("Error", "Please fill in all information!");
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem("userProfile");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Kiểm tra xem username đã tồn tại chưa
      const isUserExist = users.some((user) => user.username === username);
      if (isUserExist) {
        Alert.alert("Error", "Username already exists!");
        return;
      }

      // Tạo tài khoản mới
      const newUser = {
        id: `USR${Date.now()}`,
        name,
        username,
        password,
        phone,
        dob: "2000-02-25",
        gender: "male",
        address,
        createdAt: new Date().toISOString(),
        favoriteMovies: [],
      };

      // Lưu tài khoản vào AsyncStorage
      users.push(newUser);
      await AsyncStorage.setItem("userProfile", JSON.stringify(users));

      Alert.alert("Success", "Account registration successful", [
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (e) {
      console.error("Error saving user:", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex-row justify-between items-center mx-4">
        <StatusBar style="light" />
        <Logo />
        <Text className="text-white text-3xl font-bold">Sign Up</Text>
        <SearchBar />
      </SafeAreaView>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-white text-2xl font-bold text-center mb-4">
          Create an Account
        </Text>
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Full Name"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Username"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Phone"
          placeholderTextColor="#bbb"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-6"
          placeholder="Address"
          placeholderTextColor="#bbb"
          value={address}
          onChangeText={setAddress}
        />

        <Button title="Sign up" color="#ef4444" onPress={handleSignUp} />
      </ScrollView>

      <Footer />
    </View>
  );
}
