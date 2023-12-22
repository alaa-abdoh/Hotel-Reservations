import './App.css';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserIndex from './components/UserIndex';
import AdminIndex from './components/AdminIndex';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("authToken"))
      if(localStorage.getItem("userType") === "User")
        navigate("/home")
      else if(localStorage.getItem("userType") === "User")
        navigate("/Adminhome")
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<UserIndex/>}/>
        <Route path='/Adminhome' element={<AdminIndex/>}/>
      </Routes>
    </div>
  );
}

export default App;
