import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa'; // FontAwesome yıldız ikonu
import { fetchMovieDetail } from '../API';  // API fonksiyonunu içe aktar
import { ClipLoader } from 'react-spinners'; // ClipLoader veya diğer spinner'lar

const MovieCard = ({ movie }) => {
  const [showImdbID, setShowImdbID] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null); // Detayları tutacak state
  const [loading, setLoading] = useState(true);  // Yükleniyor durumu

  // Detaylı film bilgisini çekme
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetail(movie.imdbID);  // imdbID'yi kullanarak film detayını çek
        setMovieDetails(data);  // Film detaylarını state'e set et
        setLoading(false);  // Yüklenme tamamlandığında loading'i false yap
      } catch (error) {
        console.error("Film detayları alınamadı:", error);
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movie.imdbID]);  // sadece movie.imdbID değiştiğinde çağrılacak

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );  // Loading animasyonu gösterilir
  }

  return (
    <div className="relative overflow-hidden flex flex-col h-full">
      <Link to={`/details/${movie.imdbID}`} className="flex-shrink-0 relative group">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600'}
          alt={movie.Title}
          className="w-full h-[400px] object-cover border-2 border-gray-600 group-hover:scale-110 group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out"
        />

        {/* IMDb Rating ve Yıldız İkonu */}
        {movieDetails && movieDetails.imdbRating && (
          <div className="absolute top-4 right-4 flex items-center space-x-1 text-yellow-400">
            <FaStar className="text-lg" /> {/* Yıldız ikonu */}
            <span className="font-semibold text-lg">{movieDetails.imdbRating}</span>
          </div>
        )}

        {/* Release Year sol alt köşeye */}
        <div className="absolute bottom-2 left-2 text-white font-semibold bg-black bg-opacity-40 p-2 rounded-lg">
          {movie.Year || 'N/A'}
        </div>
      </Link>
      
      {/* Film Başlığı */}
      <h3 className="text-xs font-bold text-white text-center mt-2 relative z-10">
        {movie.Title}
      </h3>
    </div>
  );
};

export default MovieCard;
