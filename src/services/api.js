import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchMovies = async (query = 'Pokemon', page = 1, type = 'movie', year = '') => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                s: query,
                page: page,
                type: type,
                y: year,
            },
        });

        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        return { Error: 'Failed to fetch data' };
    }
};

export const fetchMovieDetail = async (imdbID) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        return { Error: 'Failed to fetch movie details' };
    }
};

export const fetchEpisodeDetails = async (title, season, episode) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                t: title,
                season: season,
                episode: episode,
            },
        });

        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        return { Error: 'Failed to fetch episode data' };
    }
};

export const fetchTrailerId = async (movieTitle) => {
    try {
        const response = await axios.get(YOUTUBE_BASE_URL, {
            params: {
                part: 'snippet',
                q: `${movieTitle} trailer`,
                type: 'video',
                key: YOUTUBE_API_KEY,
            },
        });

        const videoId = response.data.items[0]?.id?.videoId;
        return videoId || null;
    } catch (error) {
        console.error('YouTube API request failed:', error);
        return null;
    }
};
