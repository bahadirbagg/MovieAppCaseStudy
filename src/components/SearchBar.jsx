import React from 'react';

const SearchBar = ({ query, setQuery, year, setYear, type, setType }) => {
    // Yıllar için bir liste oluşturuluyor (örneğin 1980'den günümüze kadar)
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
        years.push(i);
    }

    return (
        <div className="flex justify-between items-center mb-4 relative">
            {/* Yıl Seçimi ve Tür Seçimi Sağ Üstte */}
            <div className="absolute top-0 right-0 flex space-x-4">
                <select
                    onChange={(e) => setYear(e.target.value)}
                    className="text-xs rounded-full md:text-base px-4 py-1 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                    className="text-xs rounded-full md:text-base px-4 py-1 border-2 border-gray-500 bg-zinc-900 text-zinc-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={type}
                >
                    <option value="movie">Movies</option>
                    <option value="series">TV Series</option>
                    <option value="episode">Episodes</option>
                </select>
            </div>

            {/* Arama Inputu Ortada */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="new-password"
                className="w-48 text-xs rounded-full md:text-base md:w-64 px-4 py-1 border-2 border-gray-500 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 mx-auto"
                placeholder="Search"
            />
        </div>
    );
};

export default SearchBar;
