import "../AdminData/AdminData.css"
import axios from "axios";
import { useState, useEffect } from "react";

function AdminData() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userRole: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const searchUserById = async () => {
    if (!searchId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${searchId}`);
      setUsers([res.data]);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      alert("User not found!");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: "",
      userRole: user.userRole,
    });
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email || !formData.userRole) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser}`, formData);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="user-data-container">
      <h2>User Data</h2>
      
      {/* Search by ID */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={searchUserById}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>User Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      value={formData.password}
                      placeholder="Enter new password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={formData.userRole}
                      onChange={(e) =>
                        setFormData({ ...formData, userRole: e.target.value })
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>••••••</td>
                  <td>{user.userRole}</td>
                  <td>
                    <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminData;
