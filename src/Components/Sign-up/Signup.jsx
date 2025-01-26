import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName,
        email,
        password,
      });

      alert("Signup successful!");
      console.log(response.data);

      // Redirect to login page after signup
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Signup Form</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Full Name</label>
        </div>
        <div className="field">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="field">
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Signup" />
        </div>
        <div className="signup-link">
          Already have an account? <Link to="/">Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
