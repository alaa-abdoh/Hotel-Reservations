import { Navigate, Outlet } from "react-router-dom";

function AuthRequireAdmin(){
    return localStorage.getItem("userType") === "Admin" ? <Outlet/> : <Navigate to="/"/>
    // if it Admin, then it can access to Admin pages
}
export default AuthRequireAdmin;