/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
