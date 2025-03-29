import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import Logout from "./pages/LogOut";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit-user/:id" element={<EditUser />} />        
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
