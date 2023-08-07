import '../../index.css'
import './Header.css'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function Header(){
    const connectedUser = localStorage.getItem("user");
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        dispatch({type:"user/logoutUser"})
        navigate('/signin')
    }
    return(
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {connectedUser? <div id="user-connected">
                <i className="fa fa-user"></i>
                {connectedUser}
                <button id="btn-signout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                <span>Sign Out</span>
                </button>
               
            </div>:
            <div>
                <Link to="/signin">
                <i className="fa fa-user-circle"></i>
                Sign In
                </Link>
            </div>
           }
        </nav>
    )

}
export default Header