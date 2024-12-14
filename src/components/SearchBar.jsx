import React, { useState, useEffect } from 'react';

const SearchBar = ({ query, setQuery, year, setYear, type, setType, setSeason, setEpisode, onSearch }) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
        years.push(i);
    }

    const [localSeason, setLocalSeason] = useState('1');
    const [localEpisode, setLocalEpisode] = useState('1');
    const [localQuery, setLocalQuery] = useState(query || '');

    useEffect(() => {
        if (type === 'episode') {
            setSeason(localSeason);
            setEpisode(localEpisode);
        }
    }, [localSeason, localEpisode, type, setSeason, setEpisode]);

    useEffect(() => {
        setLocalQuery(query);
    }, [query]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setQuery(localQuery);
            if (onSearch) onSearch(localQuery);
        }
    };

    return (
        <div className="flex flex-col mb-4 relative">
            <div className="flex flex-col space-y-4 items-center">
                <div className="flex space-x-4">
                    <select
                        onChange={(e) => setYear(e.target.value)}
                        className="text-xs rounded-full md:text-base px-4 py-2 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        value={year}
                    >
                        <option value="">All Years</option>
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>

                    <select
                        onChange={(e) => setType(e.target.value)}
                        className="text-xs rounded-full md:text-base px-4 py-2 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        value={type}
                    >
                        <option value="movie">Movies</option>
                        <option value="series">TV Series</option>
                        <option value="episode">Episodes</option>
                    </select>
                </div>

                {type === 'episode' && (
                    <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                            <label className="text-xs text-zinc-400 mb-1">Season</label>
                            <select
                                className="text-xs rounded-full md:text-base px-4 py-2 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                value={localSeason}
                                onChange={(e) => setLocalSeason(e.target.value)}
                            >
                                {Array.from({ length: 20 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col items-center">
                            <label className="text-xs text-zinc-400 mb-1">Episode</label>
                            <select
                                className="text-xs rounded-full md:text-base px-4 py-2 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                value={localEpisode}
                                onChange={(e) => setLocalEpisode(e.target.value)}
                            >
                                {Array.from({ length: 100 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
                className="w-48 text-xs rounded-full md:text-base md:w-64 px-4 py-2 border-2 border-gray-500 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 mx-auto mt-4"
                placeholder="Search"
            />
        </div>
    );
};

export default SearchBar;
