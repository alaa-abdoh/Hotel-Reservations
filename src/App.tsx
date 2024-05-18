import './App.css';
import Login from './components/Login';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import UserIndex from './components/User/UserIndex';
import AdminIndex from './components/Admin/AdminIndex';
import { useEffect } from 'react';
import AuthRequireUser from './components/User/AuthRequireUser';
import AuthRequireAdmin from './components/Admin/AuthRequireAdmin';
import Header from './components/User/Header';
import SearchResult from './components/User/SearchResult';
import Footer from './components/User/Footer';
import HotelInfo from './components/User/HotelInfo';
import Cart from './components/User/Cart';
import Checkout from './components/User/Checkout';

function App() {
  const navigate = useNavigate();
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
            <Route path='/home' element={<><Header/><Outlet/><Footer/></>}>
              <Route path='' element={<UserIndex/>}/>
              <Route path='hotelSearch' element={<SearchResult/>}/>
              <Route path='hotelSearch/hotels/:hotelID' element={<HotelInfo/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='cart/checkout' element={<Checkout/>}/>
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
