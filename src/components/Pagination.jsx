import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
    // Sayfaları sınırlamak için fonksiyonlar
    const goToFirstPage = () => setPage(1);
    const goToLastPage = () => setPage(totalPages);

    // Sayfa numaralarını dinamik olarak hesapla
    const getPageNumbers = () => {
        let pages = [];
        let start = Math.max(1, page - 2); // 2 sayfa öncesi
        let end = Math.min(totalPages, page + 2); // 2 sayfa sonrası

        // Eğer başta ve sonda çok fazla boşluk varsa, bunu düzeltiyoruz
        if (page - 2 <= 0) {
            end = Math.min(totalPages, end + (2 - page)); // Başta eksik olan sayfaları ekle
        }
        if (page + 2 > totalPages) {
            start = Math.max(1, start - (page + 2 - totalPages)); // Sonda eksik olan sayfaları ekle
        }

        // Sayfa numaralarını diziye ekle
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center mt-6">
            {/* First Button */}
            <button
                     className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition"
                onClick={goToFirstPage}
                disabled={page === 1} // İlk sayfada "First" butonu devre dışı
            >
                First
            </button>


            {/* Prev Button */}
            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition"
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                disabled={page === 1} // İlk sayfada "Prev" butonu devre dışı
            >
                Prev
            </button>

            {/* Dinamik Sayfa Numaraları */}
            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    className={`px-4 py-2 mx-2 rounded-full font-bold ${page === pageNum ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900'} transition`}
                    onClick={() => setPage(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            {/* Next Button */}
            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition"
                onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                disabled={page === totalPages} // Son sayfada "Next" butonu devre dışı
            >
                Next
            </button>

            {/* Last Button */}
            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition"
                onClick={goToLastPage}
                disabled={page === totalPages} // Son sayfada "Last" butonu devre dışı
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
