import './App.css';
import Login from './components/Login';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import UserIndex from './pages/user/Main Page/UserIndex';
import React, { Suspense, useEffect } from "react";
import AuthRequireUser from './Auth/AuthRequireUser';
import AuthRequireAdmin from './Auth/AuthRequireAdmin';
import Header from './pages/user/Header';
import SearchResult from './pages/user/Search Result/SearchResult';
import Footer from './pages/user/Footer';
import HotelInfo from './pages/user/Hotel Page/HotelInfo';
import Cart from './pages/user/Cart/Cart';
import AdminIndex from './pages/admin/main page/AdminIndex';
import Introduction from './pages/admin/main page/Introduction';
import Cities from './pages/admin/City/Cities';
import AddCity from './pages/admin/City/AddCity';
import Hotels from './pages/admin/Hotels/Hotels';
import Rooms from './pages/admin/Rooms/Rooms';
import Loader from './components/Loader';
// lazy load for Checkout component
const Checkout= React.lazy(()=> import("./pages/user/Checkout/Checkout"))
// lazy load for AddHotel component
const AddHotel= React.lazy(()=>import('./pages/admin/Hotels/AddHotel'));

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
              <Route path='cart/checkout' element={<Suspense fallback={<Loader/>}><Checkout/></Suspense>}/>
            </Route>
          </Route>

        <Route element={<AuthRequireAdmin />}>
          <Route path='/Adminhome' element={<AdminIndex />}>
            <Route path="introduction" element={<Introduction />} />
            <Route path="cities" element={<Cities />} />
            <Route path="cities/addCity" element={<AddCity />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/addHotel" element={<Suspense fallback={<Loader/>}><AddHotel/></Suspense>} />
            <Route path="rooms" element={<Rooms />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
