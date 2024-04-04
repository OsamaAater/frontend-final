import { useState, useEffect } from "react";
import commercelogo from "../assets/commercelogo.png";
import { Nav } from "../components/Nav";
import "../Css/Table.css";
import axios from "axios";

export const Delete = () => {
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    userPassword: "",
    userRole: "",
    createdAt: "",
    createdBy: "",
    modifiedAt: "",
    modifiedBy: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setTableData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    setIsEditing(!isEditing);
    try {
      const response = await axios.post("http://localhost:8080/user", newUser);
      console.log("User added successfully:", response.data);
      // Refresh data after adding user
      fetchData();
      // Clear the new user data after adding
      setNewUser({
        userId: "",
        userPassword: "",
        userRole: "",
        createdAt: "",
        createdBy: "",
        modifiedAt: "",
        modifiedBy: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/${userId}`
      );
      console.log("User deleted successfully:", response.data);
      // Refresh data after deleting user
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (row) => {
    setIsEditing(!isEditing);
    setNewUser(row); // Set the new user state with the data of the selected user
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      tableData.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="delete-page">
      <>
        <Nav />
      </>
      <div className="add-user-form">
        <h2>Add New User</h2>
        <input
          type="text"
          name="userId"
          value={newUser.userId}
          onChange={handleInputChange}
          placeholder="User ID"
        />
        <input
          type="text"
          name="userPassword"
          value={newUser.userPassword}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="userRole"
          value={newUser.userRole}
          onChange={handleInputChange}
          placeholder="User Role"
        />
        <input
          type="text"
          name="createdAt"
          value={newUser.createdAt}
          onChange={handleInputChange}
          placeholder="Created At"
        />
        <input
          type="text"
          name="createdBy"
          value={newUser.createdBy}
          onChange={handleInputChange}
          placeholder="Created By"
        />
        <input
          type="text"
          name="modifiedAt"
          value={newUser.modifiedAt}
          onChange={handleInputChange}
          placeholder="Modified At"
        />
        <input
          type="text"
          name="modifiedBy"
          value={newUser.modifiedBy}
          onChange={handleInputChange}
          placeholder="Modified By"
        />
        <button onClick={handleAddUser}>
          {isEditing ? "Update User" : "Add User"}
        </button>
      </div>
      <button onClick={exportToCSV}>Export to CSV</button>
      <table>
        <thead>
          <tr>
            <th>User UID</th>
            <th>User ID</th>
            <th>User Password</th>
            <th>User Role</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Modified At</th>
            <th>Modified By</th>
            <th>Actions</th> {/* New column for edit and delete buttons */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.userUid}</td>
              <td>{row.userId}</td>
              <td>{row.userPassword}</td>
              <td>{row.userRole}</td>
              <td>{row.createdAt}</td>
              <td>{row.createdBy}</td>
              <td>{row.modifiedAt}</td>
              <td>{row.modifiedBy}</td>
              <td>
                <button onClick={() => handleEditUser(row)}>Edit</button>
                <button onClick={() => handleDeleteUser(row.userUid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delete;
