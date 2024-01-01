import './App.css';
import Login from './components/Login';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import UserIndex from './components/UserIndex';
import AdminIndex from './components/AdminIndex';
import { useEffect } from 'react';
import AuthRequireUser from './components/AuthRequireUser';
import AuthRequireAdmin from './components/AuthRequireAdmin';
import Header from './components/Header';

function App() {
  const navigate = useNavigate();
  // localStorage.clear()
  useEffect(()=>{
    if(localStorage.getItem("authToken"))
      if(localStorage.getItem("userType") === "User")
        navigate("/home", {replace: true})
      else if(localStorage.getItem("userType") === "Admin")
        navigate("/Adminhome", {replace: true})
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>

        <Route element={<AuthRequireUser/>}>
          <Route path='/home' element={<><Header/><Outlet/></>}>
            <Route path='' element={<UserIndex/>}/>
            <Route path='about' element={<UserIndex/>}/>
            <Route path='features' element={<UserIndex/>}/>
          </Route>
          
        </Route>

        <Route element={<AuthRequireAdmin/>}>
          <Route path='/Adminhome' element={<AdminIndex/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
