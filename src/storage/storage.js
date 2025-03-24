import AsyncStorage from '@react-native-async-storage/async-storage';
import avata from '../../assets/trending/toan.png'

const userData = [
    {
        id: "USR001",
        name: "Tai Khoan Clone",
        username: "ltt",
        password: "123",
        phone: "081722339",
        avatar: avata,
        dob: "2000-02-25",
        gender: "male",
        address: "Cần Thơ, Việt Nam",
        createdAt: "2025-03-16T12:00:00Z",
        favoriteMovies: [1126166, 950396, 1149167]
    },
    {
        id: "USR001",
        name: "Lưu Trường Toán",
        username: "luutruongtoanltt",
        password: "123456",
        phone: "0949415422",
        avatar: avata,
        dob: "2000-02-25",
        gender: "male",
        address: "Cần Thơ, Việt Nam",
        createdAt: "2025-03-16T12:00:00Z",
        favoriteMovies: [1125899, 1151470, 822119, 1301650]
    }
];

export const saveUserProfile = async () => {
    try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
        // console.log(JSON.stringify(userData));
    } catch (e) {
        console.error("Lỗi khi lưu profile:", e);
    }
};
