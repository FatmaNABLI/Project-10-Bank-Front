import '../../index.css'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function getUser(){
    let user = localStorage.getItem("user");
}
function Header(){
    //const connected = useSelector((state)=>state);
    //console.log(connected)
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
            <div>
                <Link to="/signin">
                <i className="fa fa-user-circle"></i>
                <i className="fa fa-sign-out"></i>
                Sign In
                </Link>

   
            </div>
        </nav>
    )

}
export default Header