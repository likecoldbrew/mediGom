import "../styles/pagination.css"

const Pagination = ({ itemsPerPage, totalItems, currentPage, handlePageChange }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 페이지 번호 계산
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 현재 페이지 기준으로 보여줄 페이지 범위 설정
    const maxPageNumbersToShow = 5;

    // 페이지가 5개 이상일 경우 표시할 페이지 번호 계산
    let visiblePageNumbers = [];
    if (totalPages <= maxPageNumbersToShow) {
        visiblePageNumbers = pageNumbers;
    } else {
        if (currentPage <= 3) {
            // 초기 페이지들 (1~5까지)
            visiblePageNumbers = pageNumbers.slice(0, maxPageNumbersToShow);
        } else if (currentPage > totalPages - 3) {
            // 마지막 페이지들 (예: 16~20)
            visiblePageNumbers = pageNumbers.slice(totalPages - maxPageNumbersToShow, totalPages);
        } else {
            // 중간 페이지들 (예: 4~8)
            visiblePageNumbers = pageNumbers.slice(currentPage - 3, currentPage + 2);
        }
    }

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="prev-next"
            >
                &lt;
            </button>

            {visiblePageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={number === currentPage ? 'active' : ''}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="prev-next"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;