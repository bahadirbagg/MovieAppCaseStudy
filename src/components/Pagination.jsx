import React from 'react';

const Pagination = ({ page, setPage, totalPages, type }) => {

    const goToFirstPage = () => setPage(1);
    const goToLastPage = () => setPage(totalPages);

    const getPageNumbers = () => {
        let pages = [];
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, page + 2);

        if (page - 2 <= 0) {
            end = Math.min(totalPages, end + (2 - page));
        }
        if (page + 2 > totalPages) {
            start = Math.max(1, start - (page + 2 - totalPages));
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center mt-6 flex-wrap">
            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition md:px-8 md:py-3 sm:px-6 sm:py-2 hidden lg:inline-block"
                onClick={goToFirstPage}
                disabled={page === 1}
            >
                First
            </button>

            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition md:px-8 md:py-3 sm:px-6 sm:py-2 hidden sm:inline-block"
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    className={`px-4 py-2 mx-2 rounded-full font-bold ${page === pageNum ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900'} transition md:px-6 md:py-3 sm:px-4 sm:py-2`}
                    onClick={() => setPage(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition md:px-8 md:py-3 sm:px-6 sm:py-2 hidden sm:inline-block"
                onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                disabled={page === totalPages}
            >
                Next
            </button>

            <button
                className="px-6 py-2 mx-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white font-bold transition md:px-8 md:py-3 sm:px-6 sm:py-2 hidden lg:inline-block"
                onClick={goToLastPage}
                disabled={page === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
