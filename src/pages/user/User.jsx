import { useSelector } from "react-redux"
import Account from "../../components/account/Account"

function User(){
    const accounts = [
        {title:'Argent Bank Checking (x8349)',amount:'$2,082.79',description:'Available Balance'},
        {title:'Argent Bank Savings (x6712)',amount:'$10,928.42',description:'Available Balance'},
        {title:'Argent Bank Credit Card (x8349)',amount:'$184.30',description:'Current Balance'}
    ]
    const {user} = useSelector((state)=>state.user)
   
    return(
      
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user && user.firstName} {user && user.lastName}</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account,index)=>
        <Account key={`account-${index}`} title={account.title} amount={account.amount} description={account.description}/>
        )}
      
      </main> 
    )
}
export default User