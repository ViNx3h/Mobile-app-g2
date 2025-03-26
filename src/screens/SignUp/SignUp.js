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
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  // Hàm kiểm tra và lọc số điện thoại
  const handlePhone = (input) => {
    const numericInput = input.replace(/[^0-9]/g, ""); // Chỉ giữ lại số
    setPhone(numericInput);
  };

  // Hàm kiểm tra ngày sinh (DOB) chỉ khi nhập đủ 10 ký tự
  const handleDob = (input) => {
    setDob(input);
  };

  const handleSignUp = async () => {
    if (
      !name ||
      !username ||
      !password ||
      !phone ||
      !address ||
      !dob ||
      !gender
    ) {
      Alert.alert("Error", "Please fill in all information!");
      return;
    }

    // Kiểm tra số điện thoại
    if (!/^0\d{9}$/.test(phone)) {
      Alert.alert(
        "Error",
        "Phone number must be exactly 10 digits and start with 0."
      );
      return;
    }

    // Kiểm tra định dạng ngày sinh (DOB)
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobRegex.test(dob)) {
      Alert.alert("Invalid Date", "Please enter DOB in DD/MM/YYYY format.");
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem("userProfile");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const isUserExist = users.some((user) => user.username === username);
      if (isUserExist) {
        Alert.alert("Error", "Username already exists!");
        return;
      }

      const newUser = {
        id: `USR${Date.now()}`,
        name,
        username,
        password,
        phone,
        dob,
        gender,
        address,
        createdAt: new Date().toISOString(),
        favoriteMovies: [],
      };

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

        {/* Phone Input với kiểm tra số */}
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Phone"
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={phone}
          onChangeText={handlePhone}
          maxLength={10}
        />

        {/* Date of Birth (DOB) Input với kiểm tra định dạng */}
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Date of Birth (DD/MM/YYYY)"
          placeholderTextColor="#bbb"
          value={dob}
          onChangeText={handleDob}
          maxLength={10}
        />

        {/* Gender Input */}
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-4"
          placeholder="Gender"
          placeholderTextColor="#bbb"
          value={gender}
          onChangeText={setGender}
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