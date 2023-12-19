import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import NotRegistered from './NotRegistered';
import Loader from './Loader';

function Login(){
    const [userName, setUserName] = useState<String>();
    const [password, setPassword] = useState<String>();
    const [isNotRegistered, setIsNotRegistered] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function SubmitHandler(e:any){
        e.preventDefault();
        setIsLoading(true)
        try{
            const data = (await axios.post(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate/`,{userName:userName, password:password})).data
            setIsLoading(false);
            setIsNotRegistered(false)
            console.log(data)       
        }catch(e:any){
            setIsLoading(false);
            setIsNotRegistered(true)
        }
    }

    return(
        <div className="loginPage">
            {isNotRegistered? <NotRegistered/> : null}
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
                {isLoading ? <Loader/> : null /*Absolute, depend on content div in css*/}
            </div>
        </div>
    )
}
export default Login;