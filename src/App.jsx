
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import Signup from "./Components/Sign-up/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
