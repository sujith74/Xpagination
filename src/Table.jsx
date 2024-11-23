// 1
import React, { useState, useEffect } from "react";

// 2
export default function PaginationTable() {
  // 3
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // 4: Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        // 5
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      // 6
      setData(result);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch data");
      alert("Failed to fetch data");
    }
  };

  // 7: Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // 8: Calculate pagination data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 9: Pagination handlers
  const handleNext = () => {
    if (indexOfLastItem < data.length) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // 10: Render UI
  return (
    <div>
      {error ? (
        // 11: Display error message
        <div data-testid="error-message" style={{ color: "red" }}>
          {error}
        </div>
      ) : (
        <>
          {/* 12: Render table */}
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* 13: Pagination buttons */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                padding: "10px",
                marginRight: "10px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              data-testid="prev-button"
            >
              Previous
            </button>
            <span
              style={{
                fontWeight: "bold",
                margin: "0 10px",
              }}
              data-testid="page-number"
            >
              {currentPage} 
            </span>

            <button
              onClick={handleNext}
              disabled={indexOfLastItem >= data.length}
              style={{
                padding: "10px",
                cursor:
                  indexOfLastItem >= data.length ? "not-allowed" : "pointer",
              }}
              data-testid="next-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
