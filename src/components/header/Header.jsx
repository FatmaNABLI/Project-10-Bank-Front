import '../../index.css'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function getUSer(){
    let user = localStorage.getItem("user")  ;
    console.log(user);
    if(!user){
        user = null
    }
    return user
}
function Header(){
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
  
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        dispatch({type:"user/logoutUser"})
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
            {user? <div id="user-connected">
                <i className="fa fa-user"></i>
                {/* {user} */}
                <button id="btn-signout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign Out
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