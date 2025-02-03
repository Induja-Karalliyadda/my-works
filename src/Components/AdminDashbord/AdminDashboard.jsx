import { Outlet } from "react-router-dom";
import Sidebar from "./SlidebarAdmin/SlidebarAdmin";
import "../AdminDashbord/AdminDashbord.css"
function AdminDashboard() {
  return (
    <div className="content">
    <div className='flex items-start '>
     <Sidebar/>
       <Outlet/>
      </div>


   </div>

  )
}

export default AdminDashboard