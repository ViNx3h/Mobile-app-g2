import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avata from '../../../assets/trending/toan.png';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (!name || !username || !password || !phone || !address) {
            Alert.alert('Error', 'Please fill in all information!');
            return;
        }

        const newUser = {
            id: `USR${Date.now()}`,
            name,
            username,
            password,
            phone,
            avatar: avata,
            dob: "2000-02-25",
            gender: "male",
            address,
            createdAt: new Date().toISOString(),
            favoriteMovies: []
        };

        try {
            const existingUsers = await AsyncStorage.getItem('userProfile');
            const users = existingUsers ? JSON.parse(existingUsers) : [];
            users.push(newUser);
            await AsyncStorage.setItem('userProfile', JSON.stringify(users));
            Alert.alert('Success', 'Account already registered!', [
                { text: 'OK', onPress: () => navigation.navigate('SignIn') }
            ]);
        } catch (e) {
            console.error('Lỗi khi lưu user:', e);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Phone"
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                placeholder="Address"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />

            <Button title="Sign up" onPress={handleSignUp} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});
