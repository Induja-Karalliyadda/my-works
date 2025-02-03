import { Link } from 'react-router-dom';
import "../SlidebarAdmin/SlidebarAdmin.css";

function Sidebar() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
        <li>
            <Link to="/admin-dashboard/admin">Admin </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/admin-data">User Data</Link>
          </li>
          <li>
            <Link to="/admin-dashboard/add-couse">Add Couse</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
