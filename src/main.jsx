import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './index.css'
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignIn from './pages/signIn/SignIn';
import User from './pages/user/User';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
      <Header/>
        <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/signin" element ={<SignIn/>} />
        <Route path="/user" element ={<User/>} />


        </Routes>
      <Footer/>
      </Router>
  </React.StrictMode>,
)
