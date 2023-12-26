import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import NotRegistered from './NotRegistered';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [userName, setUserName] = useState<String>();
    const [password, setPassword] = useState<String>();
    const [isNotRegistered, setIsNotRegistered] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function SubmitHandler(e:any){
        e.preventDefault();
        setIsLoading(true)
        try{
            const data = (await axios.post(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate/`,{userName:userName, password:password})).data
            setIsLoading(false);
            setIsNotRegistered(false)
            if (data.userType === "User")
                navigate("/home")
            if(data.userType === "Admin")
                navigate("/Adminhome")
            localStorage.setItem("authToken", data.authentication)
            localStorage.setItem("userType", data.userType)
       
        }catch(e:any){
            setIsLoading(false);
            setIsNotRegistered(true)
        }
    }

    return(
        <div className="loginPage">
            {isNotRegistered && <NotRegistered/> }
            <div className="content">
                <h2>Login</h2>
                <form onSubmit={(e)=>SubmitHandler(e)}>
                    <div className="userName">
                        <input onChange={(e)=>{setUserName(e.target.value)}} type="text" name="userName" placeholder="User Name" required />
                        <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                    </div>
                    <div className="password">
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Password" required />
                        <FontAwesomeIcon icon={faLock} className='icon'/>
                    </div>
                    <input type="submit" value="Login" />
                </form>
                {isLoading && <Loader/> /*Absolute, depend on content div in css*/}
            </div>
        </div>
    )
}
export default Login;