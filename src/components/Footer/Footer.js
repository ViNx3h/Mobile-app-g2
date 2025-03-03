import { View, Text } from "react-native";
import React from "react";

export default function Footer() {
    return (
        <View className="w-full bg-black py-4 items-center border-t border-gray-700">
            <Text className="text-gray-100 text-sm font-semibold">
                © 2025 Cine Booking App
            </Text>
            <Text className="text-gray-400 text-xs">All rights reserved.</Text>
        </View>
    );
}