const API_KEY = "fd72fbb755f23fa49c72918520fd2939";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        return data.genres; 
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
};

export const fetchMoviesByGenre = async (genreId) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        return data.results
    } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
        return [];
    }
};
