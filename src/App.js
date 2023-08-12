import Navbar from "./components/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const isLoggedIn= localStorage.getItem('token');
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
   <Route path="/" element={ <Signup/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/home" element={<Home/>}/>
   {<Route path="/profile" element={<Profile/>}/>}
   <Route path="/forgetpassword" element={<ForgetPassword/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
