import AsyncStorage from "@react-native-async-storage/async-storage";

// Thay bằng API Key của bạn từ TMDb
const API_KEY = "fd72fbb755f23fa49c72918520fd2939";  
const BASE_URL = "https://api.themoviedb.org/3";

// Gọi API để lấy thông tin của 1 bộ phim theo ID
export const fetchMovieById = async (id) => {
    try {

        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=vi-VN`);
    //    if (!response.ok) throw new Error("Lỗi khi lấy phim");
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy phim ID ${id}:`, error);
        return null;
    }
};

// Hàm lấy danh sách phim yêu thích từ AsyncStorage
export const fetchFavoriteMovies = async () => {
    try {
        const userDataString = await AsyncStorage.getItem("currentUser");
        if (!userDataString) {
            console.error("Không tìm thấy dữ liệu user!");
            return [];
        }

        const user = JSON.parse(userDataString);
        if (!user.favoriteMovies || user.favoriteMovies.length === 0) {
            console.log("Người dùng chưa có phim yêu thích!");
            return [];
        }

        // Gọi API để lấy thông tin của tất cả phim yêu thích
        const movieRequests = user.favoriteMovies.map(id => fetchMovieById(id));
        const movies = await Promise.all(movieRequests);

        return movies.filter(movie => movie !== null); // Loại bỏ phim lỗi
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phim yêu thích:", error);
        return [];
    }
};
