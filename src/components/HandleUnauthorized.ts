import { useNavigate } from "react-router-dom";

function handleUnauthorized(){
    const navigate = useNavigate();
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    window.history.replaceState(null, '', '/');
};
export default handleUnauthorized;