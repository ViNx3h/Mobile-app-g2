import axios from "axios";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939"; // Thay bằng API Key của bạn
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrailer = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
            params: { api_key: API_KEY, language: "en-US" },
        });


        const trailers = response.data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailers.length > 0) {
            return trailers[0].key;
        }

        console.log("Không tìm thấy trailer!");
        return null;
    } catch (error) {
        console.error("Lỗi lấy trailer:", error.response?.data || error.message);
        return null;
    }
};
