import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch , useSelector } from 'react-redux';
import {credentials ,loggedin} from '../State/actions'
import {useNavigate} from 'react-router-dom';
import login from '../Functions/login';
import validateLogin from '../Functions/validateLogin';

export default function Login() {
  const [credential,setcredential]=useState({email:"", password:""});
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state=useSelector((state) => state)
  const isLoggedin = state.isLoggedin;  
  useEffect(() => {
    if(isLoggedin)  {navigate('/');}
  })
  const handleChange=(event)=>{
    setcredential({...credential,[event.target.name]:event.target.value});
  }
  const handleSubmitt=async(event)=>{
    event.preventDefault();
    const result=validateLogin(credential);
    if(result.status)
    {
      setLoading(true);
      const response=await login(credential.email,credential.password);
      setLoading(false);
      if(response.success)
      {
         alert("sign up suceessfull")
         const {name,email,token}=response
         dispatch(credentials({name,email,token}))
         localStorage.setItem('credential',JSON.stringify({name,email,token,isLoggedin:true}))
         navigate('/');
      }
      else{
        alert(response.message)
      }
      
    }
    else
    {
      console.log(result.error)
    }
  }    
  return (
    <div className="container-fluid p-5" style={{ height: '90vh' }}>
      <div className="row h-100">
        {/* Left Side (Dummy Content) */}
        <div className="col-md-5 bg-primary text-white p-3">
          <h2>Dummy</h2>
          <p>Content</p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="col-md-5 p-3">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password"  onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmitt}>Login</button>
          </form>

          {/* Forgot Password Option */}
          <div className="mt-3">
            <p className="text-center">
              <a onClick={()=>{navigate('/construction')}}>Forgot Password?</a>
            </p>
          </div>
          <p>or</p>
          {/* Create Account Option */}
          <div className="mt-3">
            <p className="text-center">
              New to Flipkart? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}