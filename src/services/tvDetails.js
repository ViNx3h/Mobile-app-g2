import axios from "axios";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTvDetail = async (tvId) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${tvId}`, {
            params: {
                api_key: API_KEY,
                language: "en-US",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching TV details:", error.response?.data || error.message);
        return null;
    }
};
