import './SignIn.css'
import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { loginUser, profileUser } from "../../store/UserSlice";
import { Link, useNavigate } from "react-router-dom";

function SignIn(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  //redux state

  const {loading,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //LocalStorage 
  let connectedUser = localStorage.getItem("user");

  const handleLoginEvent = (e)=>{
    e.preventDefault();
    let userCredentials = {email:email,password: password};
    dispatch(loginUser(userCredentials)).then((result)=>{
      //console.log(error);
      if(result.payload){
        setEmail('')
        setPassword('')
        dispatch(profileUser())
        navigate('/user')
      }
    })
  }
    return(
      connectedUser?
          <div id="sigin-connected">
            Vous êtes déja connecté<br/>
            <Link to="/user">Mes transactions</Link>
          </div>
        :<main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLoginEvent}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange ={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange ={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* PLACEHOLDER DUE TO STATIC SITE  */}
            {/* <a href="./user.html" className="sign-in-button">Sign In</a> */}
            {/* SHOULD BE THE BUTTON BELOW */}
            <button className="sign-in-button">Sign In</button> 
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </main>
    )

}
export default SignIn