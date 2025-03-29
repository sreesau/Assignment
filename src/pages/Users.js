import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers(page);
    }
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="users-container">
      <div className="header">
        <h2>Users List</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {error && <p className="error">{error}</p>}
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} className="user-avatar" />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination UI */}
      <div className="pagination">
        <button 
          className={`page-btn ${page === 1 ? "disabled" : ""}`} 
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index + 1} 
            className={`page-btn ${page === index + 1 ? "active" : ""}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button 
          className={`page-btn ${page === totalPages ? "disabled" : ""}`} 
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Users;
