import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserData.css"; // Optional: Add styling

function UserData() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Get logged-in user ID from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in localStorage");
      setLoading(false);
      return;
    }
    fetchUserDetails(userId);
  }, []);

  // Fetch user details from the backend
  const fetchUserDetails = async (userId) => {
    try {
      console.log(`Fetching user details for ID: ${userId}`);
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log("User data received:", res.data);

      if (!res.data) {
        console.warn("No user data found in API response");
        return;
      }

      setUser(res.data);
      setFormData({
        fullName: res.data.fullName || "",
        email: res.data.email || "",
        password: "", // Leave password empty for security
      });

    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle "Edit" button click
  const handleEdit = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: "", // Keep password empty for security
    });
    setEditing(true);
  };

  // Handle "Save" button click (Update user)
  const handleSave = async () => {
    if (!formData.fullName || !formData.email) {
      alert("Full Name and Email are required!");
      return;
    }

    try {
      console.log("Updating user with:", formData);
      const res = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData);
      console.log("Profile updated successfully:", res.data);

      setUser({ ...user, fullName: formData.fullName, email: formData.email });
      setEditing(false);
      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile. Check the console for details.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      {loading ? (
        <p>Loading user data...</p>
      ) : !user ? (
        <p>No user logged in. Please <a href="/login">log in</a> first.</p>
      ) : (
        <div className="profile-details">
          {editing ? (
            <>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>New Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter new password"
                onChange={handleChange}
              />

              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Password:</strong> ••••••</p>

              <button onClick={handleEdit} className="edit-btn">Edit</button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserData;
