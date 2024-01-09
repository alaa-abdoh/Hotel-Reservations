import { Navigate, Outlet } from "react-router-dom";

function AuthRequireUser(){
    return localStorage.getItem("userType") ? <Outlet/> : <Navigate to="/"/>
    // if it is User or Admin, then it can access to users pages
}
export default AuthRequireUser;