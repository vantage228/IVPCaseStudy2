import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const pageSize = 1000;


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7028/api/View", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          asOfDate: selectedDate || undefined,
        },
      });

      const result = response.data;

      setData(result.data || []); 
      setTotalPages(result.totalPages || 0); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [pageNumber, selectedDate]);

 
  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
    setPageNumber(1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Data</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="asOfDate">Select Date: </label>
        <input
          type="date"
          id="asOfDate"
          value={selectedDate}
          onChange={handleDateChange}
          min="2020-12-31"
          max="2021-12-31"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>AsOfDate</th>
              <th>Ticker</th>
              <th>Security</th>
              <th>GICS Sector</th>
              <th>GICS Sub Industry</th>
              <th>Headquarters Location</th>
              <th>Founded</th>
              <th>Open</th>
              <th>Close</th>
              <th>DTD Change %</th>
              <th>MTD Change %</th>
              <th>QTD Change %</th>
              <th>YTD Change %</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.asOfDate || "N/A"}</td>
                  <td>{item.ticker || "N/A"}</td>
                  <td>{item.security || "N/A"}</td>
                  <td>{item.gicS_Sector || "N/A"}</td>
                  <td>{item.gicS_Sub_Industry || "N/A"}</td>
                  <td>{item.headquarters_Location || "N/A"}</td>
                  <td>{item.founded || "N/A"}</td>
                  <td>{item.open || "N/A"}</td>
                  <td>{item.close || "N/A"}</td>
                  <td>{item.dtD_Change_Percent || "0"}</td>
                  <td>{item.mtD_Change_Percent || "0"}</td>
                  <td>{item.qtD_Change_Percent || "0"}</td>
                  <td>{item.ytD_Change_Percent || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          disabled={pageNumber >= totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewData;
