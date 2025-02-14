import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Components/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (response.ok) {
        setSuccess("Login successful!");

        // Store userId in localStorage
       
          localStorage.setItem("userId",JSON.stringify(result.id) );
          console.log(result.id)     
        console.log("User Role:", result.userRole); // Debugging

        if (result.userRole === "admin") {
          navigate("/admin-dashboard");
        } else if (result.userRole === "super_admin") {
          navigate("/super-admin-dashboard");
        } else {
          navigate("/user-dashboard/user-data");
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
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
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
