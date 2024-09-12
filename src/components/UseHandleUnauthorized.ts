import { useNavigate } from "react-router-dom";

function useHandleUnauthorized() {
    const navigate = useNavigate();

    const handleUnauthorized = () => {
        navigate("/");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        window.history.replaceState(null, '', '/');
    };

    return handleUnauthorized;
}

export default useHandleUnauthorized;
