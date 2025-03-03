import axios from "axios";

const API_KEY = "fd72fbb755f23fa49c72918520fd2939"; // Thay bằng API Key của bạn
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrailer = async (movieId, genre) => {
    try {
        const response = await axios.get(`${BASE_URL}/${genre}/${movieId}/videos`, {
            params: { api_key: API_KEY, language: "en-US" },
        });


        const trailers = response.data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailers.length > 0) {
            return trailers[0].key;
        }
        return null;
    } catch (error) {
        return null;
    }
};


