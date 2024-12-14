import axios from 'axios';

const API_KEY = 'f8d0ad24';
const BASE_URL = 'http://www.omdbapi.com/';

const YOUTUBE_API_KEY = 'AIzaSyC1ABDhpa-YnP2SEFPub69cknvi42rdyOQ';
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const IMAGE_PATH = 'https://img.omdbapi.com/?apikey=f8d0ad24&i=';

// Film verilerini çeken fonksiyon
export const fetchMovies = async (query = 'Pokemon', page = 1, type = 'movie', year = '') => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY, // API anahtarı
                s: query,        // Film adı (örneğin 'Pokemon')
                page: page,      // Sayfa numarası
                type: type,      // Tür (movie, series, episode)
                y: year,         // Yıl (örneğin 2022)
            },
        });

        return response.data; // Veriyi döndürüyoruz
    } catch (error) {
        console.error('API isteği başarısız oldu:', error);
        return { Error: 'Veri çekilemedi' }; // Hata mesajı döndürüyoruz
    }
};

export const fetchMovieDetail = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=f8d0ad24&i`);
    const data = await response.json();
    return data;
};

export const fetchTrailerId = async (movieTitle) => {
    try {
        const response = await axios.get(YOUTUBE_BASE_URL, {
            params: {
                part: 'snippet',
                q: `${movieTitle} trailer`, // Film adı ve "trailer" kelimesiyle arama
                type: 'video',
                key: YOUTUBE_API_KEY,
            },
        });

        // İlk video ID'sini döndür
        const videoId = response.data.items[0]?.id?.videoId;
        return videoId || null;
    } catch (error) {
        console.error('YouTube API isteği başarısız oldu:', error);
        return null;
    }
};
