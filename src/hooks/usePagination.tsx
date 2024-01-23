import React from 'react'

export default function usePagination(
  totalPages: number,
  currentPage: number,
  setCurrentPage: any
) {
  const pageNumbers: number[] = []

  for (let i: number = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const paginateFront = () =>
    setCurrentPage(currentPage === pageNumbers.length ? 1 : currentPage + 1)
  const paginateBack = () =>
    setCurrentPage(currentPage === 1 ? pageNumbers.length : currentPage - 1)

  const PaginateComponent = () => (
    <nav className="pagination-container">
      <div className="pagination container justify-content-center">
        <div
          role="button"
          className="pagination-newer cursor:pointer"
          onClick={() => paginateBack()}
        >
          &laquo;
        </div>
        <div className="pagination-inner row">
          {pageNumbers?.map((n) => (
            <div
              role="button"
              key={n}
              className={`col cursor:pointer ${currentPage === n && 'pagination-active'}`}
              onClick={() => setCurrentPage(n)}
            >
              {n}
            </div>
          ))}
        </div>
        <div
          role="button"
          className="pagination-older cursor:pointer"
          onClick={() => paginateFront()}
        >
          &raquo;
        </div>
      </div>
    </nav>
  )

  return {
    PaginateComponent
  }
}
