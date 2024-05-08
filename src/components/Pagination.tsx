import React from "react";

type PaginationProps = {
  handleNext: () => void;
  handlePrev: () => void;
  nextPage: string | null;
  prevPage: string | null;
  limit: number;
  handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination = ({
  handleNext,
  handlePrev,
  nextPage,
  prevPage,
  limit,
  handleLimitChange,
}: PaginationProps) => {
  return (
    <div>
      <nav className="flex items-center justify-between pb-10">
        <ul className="flex items-center -space-x-px gap-2 h-10 text-base">
          <li>
            <button
              onClick={handlePrev}
              disabled={!prevPage}
              className="flex items-center justify-center p-3 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </button>
          </li>

          <li>
            <button
              onClick={handleNext}
              disabled={!nextPage}
              className="flex items-center justify-center p-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>

        <select
          className="px-3 py-2 border rounded-lg"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
        </select>
      </nav>
    </div>
  );
};

export default Pagination;
