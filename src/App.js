import Navbar from "./components/Navbar";
import Expense from "./components/expenses/Expense";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  const isLoggedIn= !!localStorage.getItem('token');
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
   <Route path="/" exact element={ <Signup/>}/>
   {!isLoggedIn && <Route path="/login" element={<Login/>}/>}
   {isLoggedIn && <Route path="/home" element={<Home/>}/>}
   {isLoggedIn && <Route path="/profile" element={<Profile/>}/>}
   {isLoggedIn && <Route path="/expense" element={<Expense/>}/>}
   <Route path="/forgetpassword" element={<ForgetPassword/>}/>
   <Route path='*' element={<Navigate to='/login'/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
