import axios from 'axios';

// API anahtarlarını ve base URL'leri çevre değişkenlerinden alalım
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const IMAGE_PATH = 'https://img.omdbapi.com/?apikey=' + API_KEY + '&i=';

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

// Film detayını çeken fonksiyon
export const fetchMovieDetail = async (imdbID) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                i: imdbID,  // IMDb ID ile sorgu yapıyoruz
            },
        });
        return response.data;
    } catch (error) {
        console.error('Film detayları alınırken hata oluştu:', error);
        return { Error: 'Film detayları alınamadı' };
    }
};

// Film trailer ID'sini çeken fonksiyon
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
