import { useNavigate } from "react-router-dom";

function UserHome() {
    const navigate = useNavigate(); // For navigating on logout
    const handleLogout = () => {
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };
  return (
    <div>
         <h1>Welcome to User Dashboard</h1>
        <p>Manage user data and records.</p>

        <div className="login-icon">
          <button onClick={handleLogout}>Logout</button>
        </div>

    </div>
  )
}

export default UserHome