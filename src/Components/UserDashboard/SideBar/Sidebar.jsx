import { Link } from 'react-router-dom';
import "../SideBar/SideBar.css";

function Sidebar() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
        <li>
            <Link to="/user-dashboard/user-records">User </Link>
          </li>
          <li>
            <Link to="/user-dashboard/user-data">User Data</Link>
          </li>
          <li>
            <Link to="/user-dashboard/user-course">enroll Course</Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
