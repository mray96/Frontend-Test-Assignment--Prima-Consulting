import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getVisiblePages(page, totalPages) {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  return Array.from(pages)
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({ page, pageSize, total, totalPages, onPageChange, onPageSizeChange }) {
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="table-footer">
      <label>
        Show
        <select value={pageSize} onChange={(event) => onPageSizeChange(event.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        of {total.toLocaleString()} results
      </label>

      <div className="pagination" aria-label="Pagination">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={14} />
        </button>
        {visiblePages.map((item, index) => (
          <span key={item} className="page-group">
            {index > 0 && item - visiblePages[index - 1] > 1 ? <span className="ellipsis">...</span> : null}
            <button
              className={item === page ? 'current' : ''}
              type="button"
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          </span>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
