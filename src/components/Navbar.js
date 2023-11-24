import React,{useEffect} from 'react'
import {  Link , useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { credentials } from '../State/actions';


export default function Navbar() {
  const navigate=useNavigate();
  let location = useLocation();
  const state=useSelector((state) => state)
  const isLoggedin = state.isLoggedin;
  const mycredentials = state.credentials;
  const dispatch = useDispatch();
  useEffect(() => {
   console.log(isLoggedin)
   console.log(credentials)
   console.log(state)
  
   
  })
  const handleLogout=()=>{
    console.log("hello")
    dispatch(credentials({}))
    localStorage.setItem('credential',JSON.stringify({name:"",email:"",token:"",isLoggedin:false}))
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div className="container-fluid">
 <Link className="navbar-brand" to="#">{localStorage.getItem("username")}</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Calculate</Link>
          </li>
          
         
          <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/setconfig"?"active":""}`} aria-current="page" to="/setconfig">set config</Link>
          </li>
          </ul>
          { 
  isLoggedin?  <>
         <Link className="btn btn-primary mx-3" to="#" role="button">{mycredentials.name}</Link>
      
        <button onClick={handleLogout}>Logout</button>
        </>:
        <form className="d-flex" role="search">
    
       
       <> <Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link> 
        </>
        </form>
        }
      </div>
    </div>
  </nav>
  )
}