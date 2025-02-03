import "../UserDashboard/UserDashboard.css";
import Sidebar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";

function UserDashboard() {

  return (
      <div className="content">
       <div className='flex items-start '>
        <Sidebar/>
          <Outlet/>
         </div>

 
      </div>
   
  );
}

export default UserDashboard;
