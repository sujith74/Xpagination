import React, { useEffect, useState } from 'react';

export default function Table() {
    const [data, setData] = useState([]); // All fetched data
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 10; // Maximum items per page
    const maxPages = 5; // Maximum number of pages

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch(
                'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
            );
            const res = await response.json();
            setData(res);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate the number of pages
    const totalPages = Math.min(Math.ceil(data.length / itemsPerPage), maxPages);

    // Slice the data for the current page
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
                <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
