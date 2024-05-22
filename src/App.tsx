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
import Cities from './components/Admin/Cities';
import Hotels from './components/Admin/Hotels';
import Rooms from './components/Admin/Rooms';
import Introduction from './components/Admin/Introduction';
import AddCity from './components/Admin/AddCity';
import AddHotel from './components/Admin/AddHotel';

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

        <Route element={<AuthRequireAdmin />}>
          <Route path='/Adminhome' element={<AdminIndex />}>
            <Route path="introduction" element={<Introduction />} />
            <Route path="cities" element={<Cities />} />
            <Route path="cities/addCity" element={<AddCity />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/addHotel" element={<AddHotel />} />
            <Route path="rooms" element={<Rooms />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
