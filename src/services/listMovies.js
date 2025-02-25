// src/api/trendingApi.js
import axios from 'axios';

// Sử dụng API thực tế thay vì exp://
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const API_KEY = 'fd72fbb755f23fa49c72918520fd2939';

// Hàm lấy dữ liệu trending
export const fetchTrendingData = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { api_key: API_KEY },
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Lỗi khi gọi API trending:', error.message);
        return [];
    }
};
