import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SuperAdminDashboad from './Components/SuperAdminDashboard/SuperAdminDashboad';
import UserDashboard from './Components/UserDashboard/userDashboard';
import AdminDashboard from './Components/AdminDashbord/adminDashboard';
import Signup from './Components/Sign-up/Signup';
import UserData from './Components/UserDashboard/UserData/UserData';
import UserHome from './Components/UserDashboard/UserHome/UserHome'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={< UserDashboard   />}>
         <Route path="user-data" element={<UserData />} /> 
         <Route path="user-records" element={<UserHome />} /> 
         </Route>
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/super-admin-dashboard" element={< SuperAdminDashboad  />} />

      </Routes>
    </Router>
  );
}

export default App;
