import './User.css'
import { useSelector } from "react-redux"
import {useDispatch} from "react-redux"
import Account from "../../components/account/Account"
import { changeProfileUser } from "../../store/UserSlice";
import { useState } from "react";
import { Link } from 'react-router-dom';

function User(){
    const accounts = [
        {title:'Argent Bank Checking (x8349)',amount:'$2,082.79',description:'Available Balance'},
        {title:'Argent Bank Savings (x6712)',amount:'$10,928.42',description:'Available Balance'},
        {title:'Argent Bank Credit Card (x8349)',amount:'$184.30',description:'Current Balance'}
    ]
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    
    //Get the user foron local storage
    const connectedUser = localStorage.getItem("user");

    const handleChangeProfileEvent = (e)=>{
      e.preventDefault();
      let fn = firstName, ln = lastName;
      if(firstName == ""){
        fn = user.firstName;
      }
      if(lastName == ""){
        ln = user.lastName;
      }
      if(firstName == "" && lastName == ""){
        alert("Please enter the first Name or the last Name to change")

      }else{
        let userCredentials = {firstName:fn,lastName:ln};
        dispatch(changeProfileUser(userCredentials))
      }
      
    }
    const openForm = ()=>{
      const form = document.getElementById("form-change-profile");
      form.style.display="block";
      document.getElementById("edit-button").style.display="none"
    }
    const closeForm = ()=>{
      document.getElementById("form-change-profile").style.display = "none"
      document.getElementById("edit-button").style.display="inline-block"

    }
   
    return(
      
      !connectedUser?
      <div id="user-not-connected">
        Connectez vous pour accèder au contenu de cette page<br/>
        <Link to="/signin">Me connecter</Link>
      </div>
      :<main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user && user.firstName} {user && user.lastName}</h1>
          <form id="form-change-profile" onSubmit={handleChangeProfileEvent}>
            <div>
              <input type="text" id="userFirstName" placeholder = {user && user.firstName}  onChange ={(e)=>setFirstName(e.target.value)}/>
              <input type="text" id="userLastName" placeholder = {user && user.lastName} onChange ={(e)=>setLastName(e.target.value)} />
            </div>
            <div>
            <button className="edit-button" type="submit">Valider</button> 
            <button className="edit-button cancel-button" type="reset" onClick={closeForm}>Annuler</button>
            </div>
            
          </form>
          <button id="edit-button" className="edit-button" onClick={openForm}>Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account,index)=>
        <Account key={`account-${index}`} title={account.title} amount={account.amount} description={account.description}/>
        )}
      
      </main> 
    )
}
export default User