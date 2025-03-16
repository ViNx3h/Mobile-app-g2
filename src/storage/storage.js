import AsyncStorage from '@react-native-async-storage/async-storage';

const userData = {
    id: "USR001",
    name: "Lưu Trường Toán",
    email: "luutruongtoantt@gmail.com",
    phone: "0949415422",
    avatar: "https://example.com/avatar.jpg",
    dob: "2000-02-25",
    gender: "male",
    address: "Cần Thơ, Việt Nam",
    createdAt: "2025-03-16T12:00:00Z",
    favoriteMovies: [1126166, 950396, 1149167]
};

export const saveUserProfile = async () => {
    try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
        console.log("Lưu profile thành công!");
    } catch (e) {
        console.error("Lỗi khi lưu profile:", e);
    }
};

export const getUserProfile = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userProfile');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Lỗi khi lấy profile:", e);
        return null;
    }
};
