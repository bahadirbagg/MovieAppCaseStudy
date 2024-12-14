import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../API';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('Pokemon');
    const [page, setPage] = useState(1);
    const [year, setYear] = useState('');
    const [type, setType] = useState('movie');
    const [totalResults, setTotalResults] = useState(0); // Toplam sonuçları tutacak state

    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchMovies(query, page, type, year);
            setMovies(data.Search || []); // Gelen filmleri state'e set et
            setTotalResults(data.totalResults || 0); // Toplam sonuçları state'e set et
        };

        loadMovies();
    }, [query, page, year, type]);

    const totalPages = Math.ceil(totalResults / 10); // Sayfa başına 10 film olduğunu varsayarak toplam sayfa sayısını hesapla

    return (
        <div className="container mx-auto px-4 pt-16 pb-16">
            <div className='p-10 bg-zinc-800'>
                {/* Arama ve Filtreleme */}
                <SearchBar query={query} setQuery={setQuery} year={year} setYear={setYear} type={type} setType={setType} />

                {/* Film Listesi Tablosu */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {movies.length > 0 ? (
                            movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
                        ) : (
                            <div className="col-span-full text-center bg-red-100 text-red-700 p-5 rounded-lg font-semibold uppercase shadow-lg transition-all duration-300 hover:bg-red-200">
                                 {`No ${type} found`}
                            </div>
                        )}
                    </div>

                {/* Sayfalama */}
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default Home;
