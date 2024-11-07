import React from "react";

function PaginationPost({ totalPages, currentPage, setCurrentPage }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleCurrentPage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <nav>
          <ul className="pagination gap-2 justify-content-center mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link border-dark-light text-black"
                style={{ borderRadius: "20%", background: "#f2f2f2" }}
                onClick={() => handleCurrentPage(currentPage - 1)}
                aria-label="previous"
                disabled={currentPage === 1}
              >
                <svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10.6666L1.33333 5.99992L6 1.33325" stroke="#84878A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                <button
                  className={`page-link ${currentPage === number ? "bg-primary bg-gradient text-dark fw-bold" : "bg-transparent border-dark-light text-muted fw-bold"}`}
                  onClick={() => handleCurrentPage(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link border-dark-light text-black"
                style={{ borderRadius: "20%", background: "#f2f2f2" }}
                onClick={() => handleCurrentPage(currentPage + 1)}
                aria-label="next"
                disabled={currentPage === totalPages}
              >
                <svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.33341L5.66667 6.00008L1 10.6667" stroke="#84878A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default PaginationPost;
