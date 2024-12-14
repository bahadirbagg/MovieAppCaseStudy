import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchEpisodeDetails } from '../services/api';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('Pokemon');
    const [page, setPage] = useState(1);
    const [year, setYear] = useState('');
    const [type, setType] = useState('movie');
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const loadInitialMovies = async () => {
            const data = await fetchMovies(query, 1, type, year);
            setMovies(data.Search || []);
            setTotalResults(data.totalResults || 0);
        };

        loadInitialMovies();
    }, []);

    useEffect(() => {
        const loadMovies = async () => {
            if (type === 'episode' && season && episode) {
                const episodeData = await fetchEpisodeDetails(query, season, episode);
                setMovies([episodeData]);
            } else {
                const data = await fetchMovies(query, page, type, year);
                setMovies(data.Search || []);
                setTotalResults(data.totalResults || 0);
            }
        };

        loadMovies();
    }, [query, page, year, type, season, episode]);

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="container mx-auto px-4 pt-16 pb-16">
            <div className="p-10 bg-zinc-800">
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    year={year}
                    setYear={setYear}
                    type={type}
                    setType={setType}
                    setSeason={setSeason}
                    setEpisode={setEpisode}
                    onSearch={handleSearch}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {movies.length > 0 ? (
                        movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
                    ) : (
                        <div className="col-span-full text-center bg-red-100 text-red-700 p-5 rounded-lg font-semibold uppercase shadow-lg transition-all duration-300 hover:bg-red-200">
                            {`No ${type} found`}
                        </div>
                    )}
                </div>

                {type !== 'episode' && (
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                )}
            </div>
        </div>
    );
};

export default Hero;
