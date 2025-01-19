import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <div className="wrapper">
      <div className="title">Signup Form</div>
      <form action="#">
        <div className="field">
          <input type="text" required />
          <label>Full Name</label>
        </div>
        <div className="field">
          <input type="email" required />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input type="password" required />
          <label>Password</label>
        </div>
        <div className="field">
          <input type="password" required />
          <label>Confirm Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="terms" />
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

