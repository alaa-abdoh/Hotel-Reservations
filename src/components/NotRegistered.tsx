import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function NotRegistered(){
    return (
        <div className="notRegistered">
        <FontAwesomeIcon icon={faTriangleExclamation} className='icon'/>
                <div>
                    <h4>There was a problem</h4>
                    <p>We cannot find an account with these userename & password</p>    
                </div>        
        </div>
    )
}
export default NotRegistered;