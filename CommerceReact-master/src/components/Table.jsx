import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Table.css';

export const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState('all'); // Default filter criteria
  const [viewRow, setViewRow] = useState(null); // Track which row is being viewed

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/serverinfos');
      setTableData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const handleView = (row) => {
    setViewRow(row === viewRow ? null : row); // Toggle viewRow
  };

  const handleDelete = async (serverInfoUid) => {
    try {
      await axios.delete(`http://localhost:8080/serverinfos/${serverInfoUid}`);
      // After successful deletion from the server, update the state to reflect the change
      setTableData(tableData.filter((row) => row.serverInfoUid !== serverInfoUid));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleEdit = (row) => {
    // Implement edit logic here
    console.log('Edit row:', row);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
        + tableData.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Define filter options
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Server UID', value: 'serverInfoUid' },
    { label: 'Application ID', value: 'appInfoUid' },
    { label: 'Source Hostname', value: 'sourceHostname' },
    { label: 'Source IP Address', value: 'sourceIpAddress' },
    { label: 'Destination Host Name', value: 'destinationHostName' },
    { label: 'Destination IP Address', value: 'destinationIpAddress' },
    { label: 'Destination Port', value: 'destinationPort' },
    { label: 'IP Status', value: 'ipStatus' },
  ];

  // Function to filter data based on search input and selected filter criteria
  const filteredData = tableData.filter((row) => {
    if (filterCriteria === 'all') {
      return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return row[filterCriteria].toString().toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  // Function to sort data based on sorting criteria
  const sortedData = sortCriteria
      ? filteredData.slice().sort((a, b) => {
        if (a[sortCriteria] < b[sortCriteria]) return -1;
        if (a[sortCriteria] > b[sortCriteria]) return 1;
        return 0;
      })
      : filteredData;

  return (
      <div className="tableContainer">
        <div className="searchContainer">
          <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchInputChange}
          />
          <select value={filterCriteria} onChange={handleFilterChange}>
            {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
            ))}
          </select>
        </div>
        <button onClick={exportToCSV}>Export to CSV</button>
        <table>
          <thead>
          <tr>
            <th onClick={() => handleSort('serverInfoUid')}>Server UID</th>
            <th>Application ID</th>
            <th>Source Hostname</th>
            <th>Source IP Address</th>
            <th>Destination Host Name</th>
            <th>Destination IP Address</th>
            <th>Destination Port</th>
            <th>IP Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {sortedData.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                    className={row === selectedRow ? 'selected' : ''}
                    onClick={() => handleRowClick(row)}
                >
                  <td>{row.serverInfoUid}</td>
                  <td>{row.appInfoUid}</td>
                  <td>{row.sourceHostname}</td>
                  <td>{row.sourceIpAddress}</td>
                  <td>{row.destinationHostName}</td>
                  <td>{row.destinationIpAddress}</td>
                  <td>{row.destinationPort}</td>
                  <td>
                    {row.ipStatus === 'Active' ? (
                        <span>&#10004;</span> // Checkmark symbol for Active status
                    ) : row.ipStatus === 'Not Active' ? (
                        <span>&#10060;</span> // Cross mark for Not Active status
                    ) : (
                        row.ipStatus // Render the IP status text
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(row.serverInfoUid)}>Delete</button>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleView(row)}>View</button>
                  </td>
                </tr>
                {/* Conditionally render additional row details when a row is being viewed */}
                {viewRow === row && (
                    <tr>
                      <td colSpan="8">
                        <p>Created At: {row.createdAt}</p>
                        <p>Created By: {row.createdBy}</p>
                        <p>Modified At: {row.modifiedAt}</p>
                        <p>Modified By: {row.modifiedBy}</p>
                      </td>
                    </tr>
                )}
              </React.Fragment>
          ))}
          </tbody>
        </table>
      </div>
  );
};