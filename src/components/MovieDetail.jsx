import axios from "axios";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { fetchMovieDetail, fetchTrailerId } from '../API'; // Güncellenmiş API fonksiyonları
import { FaPlayCircle } from 'react-icons/fa';

const IMAGE_PATH = 'https://img.omdbapi.com/?apikey=f8d0ad24&i=';

function MovieDetail() {
    const { imdbID } = useParams(); // Parametre olarak IMDb ID alınıyor
    const [movie, setMovie] = useState(null);
    const [active, setActive] = useState(false);
    const [videoId, setVideoId] = useState(null); // YouTube fragman ID'si için state
    const [deviceSize, setDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
        const loadMovieDetails = async () => {
            // IMDb ID ile film detaylarını al
            const movieData = await fetchMovieDetail(imdbID);
            setMovie(movieData);

            // Film başlığı ile YouTube fragman ID'sini al
            if (movieData && movieData.Title) {
                const trailerId = await fetchTrailerId(movieData.Title);
                setVideoId(trailerId);
            }
        };

        loadMovieDetails();

        // Pencere boyutu değişikliğini dinlemek için event listener ekle
        const handleResize = () => setDeviceSize(window.innerWidth);
        window.addEventListener("resize", handleResize);

        // Temizlik fonksiyonu: Event listener'ı kaldır
        return () => window.removeEventListener("resize", handleResize);
    }, [imdbID]);

    if (!movie) {
        return <div>Loading...</div>; // Film bilgileri yüklenene kadar loading göstergesi
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
            <div
                className="flex min-h-[calc(100vh)] bg-cover bg-center flex-col lg:flex-row justify-center items-center"
                style={{
                    backgroundImage: `url("${movie.Poster}")`, // Arka plan için film posteri
                }}
            >
                <div className="flex p-16 flex-col lg:flex-row bg-inherit justify-center items-center" style={styles.content}>
                    {/* Poster ve Film Bilgileri */}
                    <div className="flex justify-center items-center relative">
                        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600'}
                            alt={movie.Title} width={300} className="rounded-lg" />
                        <FaPlayCircle color="white" fontSize={50} onClick={() => setActive(true)} className="absolute cursor-pointer" />
                    </div>

                    {/* Fragman */}
                    <div className="mt-5 mb-5 md:flex md:justify-center md:items-center lg:mb-0 lg:mt-0 lg:ml-10">
                        {active && renderTrailer()}
                    </div>

                    <div className="sm:mt-10 lg:w-[400px] inline-flex flex-col lg:top-0 lg:mt-0 lg:ml-10 justify-center text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{movie.Title}</h1>
                        <p className="text-sm font-semibold text-white">
                            GENRE: <span className="font-bold text-base text-orange-600">{movie.Genre}</span>
                        </p>
                        <p className="text-sm md:text-xl text-justify mt-3 text-white">{movie.Plot}</p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">Released: {movie.Released}</p>
                        <p className="text-xs md:text-sm mt-2 font-bold text-white">IMDb Rating: {movie.imdbRating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
