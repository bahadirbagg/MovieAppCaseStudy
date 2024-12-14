import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { fetchMovieDetail } from '../services/api';
import { ClipLoader } from 'react-spinners';

const MovieCard = ({ movie }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const data = await fetchMovieDetail(movie.imdbID);
                setMovieDetails(data);
                setLoading(false);
            } catch (error) {
                console.error("API request failed:", error);
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [movie.imdbID]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden flex flex-col h-full">
            <Link to={`/details/${movie.imdbID}`} className="flex-shrink-0 relative group">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600'}
                    alt={movie.Title}
                    className="w-full h-[400px] object-cover border-2 border-gray-600 group-hover:scale-110 group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out"
                />

                {movieDetails && movieDetails.imdbRating && (
                    <div className="absolute top-4 right-4 flex items-center space-x-1 text-yellow-400">
                        <FaStar className="text-lg" />
                        <span className="font-semibold text-lg">{movieDetails.imdbRating}</span>
                    </div>
                )}

                <div className="absolute bottom-2 left-2 text-white font-semibold bg-black bg-opacity-40 p-2 rounded-lg">
                    {movie.Year || 'N/A'}
                </div>

                <div className="absolute bottom-2 right-2 text-xs text-white font-semibold bg-black bg-opacity-50 p-1 rounded-lg">
                    {movie.imdbID}
                </div>
            </Link>

            <h3 className="text-xs font-bold text-white text-center mt-2 relative z-10">
                {movie.Title}
            </h3>
        </div>
    );
};

export default MovieCard;
