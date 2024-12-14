import axios from "axios";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { fetchMovieDetail, fetchTrailerId } from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function MovieDetail() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [active, setActive] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [deviceSize, setDeviceSize] = useState(window.innerWidth);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const loadMovieDetails = async () => {
            const movieData = await fetchMovieDetail(imdbID);
            setMovie(movieData);

            if (movieData && movieData.Type !== 'episode' && movieData.Title) {
                const trailerId = await fetchTrailerId(movieData.Title);
                setVideoId(trailerId);
            }
        };

        loadMovieDetails();

        const handleResize = () => setDeviceSize(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [imdbID]);

    if (!movie) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    const renderTrailer = () => {
        if (!videoId) return null;

        if (deviceSize < 426)
            return <YouTube videoId={videoId} opts={opts3} />;
        if (deviceSize > 426 && deviceSize < 666)
            return <YouTube videoId={videoId} opts={opts2} />;
        return <YouTube videoId={videoId} opts={opts} />;
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    const opts2 = {
        height: '290',
        width: '440',
        playerVars: {
            autoplay: 1,
        },
    };

    const opts3 = {
        height: '190',
        width: '340',
        playerVars: {
            autoplay: 1,
        },
    };

    const styles = {
        content: {
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    };

    return (
        <div className="movie-details">
            <button
                onClick={handleBackClick}
                className="flex items-center justify-center mt-5 p-3 bg-transparent text-orange-600 hover:text-orange-800 transition"
            >
                <FaArrowLeft className="text-2xl" />
            </button>
            <div
                className="flex min-h-[calc(100vh)] bg-cover bg-center flex-col lg:flex-row justify-center items-center bg-zinc-900"
            >
                <div className="flex p-16 flex-col lg:flex-row bg-inherit justify-center items-center" style={styles.content}>
                    <div className="flex justify-center items-center relative">
                        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600'}
                            alt={movie.Title} width={300} className="rounded-lg" />
                        {movie.Type !== 'episode' && (
                            <FaPlayCircle
                                color="white"
                                fontSize={50}
                                onClick={() => setActive(true)}
                                className="absolute cursor-pointer"
                            />
                        )}
                    </div>

                    <div className="mt-5 mb-5 md:flex md:justify-center md:items-center lg:mb-0 lg:mt-0 lg:ml-10">
                        {movie.Type !== 'episode' && active && renderTrailer()}
                    </div>

                    <div className="sm:mt-10 lg:w-[400px] inline-flex flex-col lg:top-0 lg:mt-0 lg:ml-10 justify-center text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{movie.Title}</h1>
                        <p className="text-sm font-semibold text-white">
                            GENRE: <span className="font-bold text-base text-orange-600">{movie.Genre}</span>
                        </p>
                        <p className="text-sm md:text-xl text-justify mt-3 text-white text-b font-bold">{movie.Plot}</p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">Released: <span className="font-bold text-base text-orange-600">{movie.Released}</span></p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">IMDb Rating: <span className="font-bold text-base text-orange-600">{movie.imdbRating}</span></p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">Duration: <span className="font-bold text-base text-orange-600">{movie.Runtime}</span></p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">Director: <span className="font-bold text-base text-orange-600">{movie.Director}</span></p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">Cast: <span className="font-bold text-base text-orange-600">{movie.Actors}</span></p>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MovieDetail;
