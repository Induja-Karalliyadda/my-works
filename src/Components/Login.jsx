import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Import useAuth hook
import "../Components/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        
        // Save user details in context
        login({ userId: result.id, email: result.email });

        // Redirect based on user role
        navigate(result.userRole === "admin" ? "/admin-dashboard" : "/user-dashboard");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Login Form</div>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="field">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Password</label>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
      </form>

      <div className="signup-link">
        <p> Don't have an account? </p>
        <Link to="/signup">Sign-up now</Link>
      </div>
    </div>
  );
}

export default Login;
