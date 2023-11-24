import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import signup from '../Functions/signup';
import { useSelector, useDispatch } from 'react-redux';
import {credentials ,loggedin} from '../State/actions'
import {useNavigate} from 'react-router-dom';
import validateSignup from '../Functions/validateSignup'

export default function SignUp() {
  const state=useSelector((state) => state)
  const isLoggedin = state.isLoggedin;  
  useEffect(() => {
     
      if(isLoggedin)  {navigate('/');}
  })
  
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [credential,setcredential]=useState({name:"",email:"", password:"",cpassword:""});
  const dispatch = useDispatch();

  const handleChange=(event)=>{
    setcredential({...credential,[event.target.name]:event.target.value});
  }
  const handleSubmitt=async(event)=>{
    event.preventDefault();
    console.log(credential)
    const result=validateSignup(credential);
    if(result.status)
    {
      setLoading(true);
    const response=await signup(credential.name,credential.email,credential.password);
    console.log(response)
    setLoading(false);
    if(response.success)
    {
       alert("sign up suceessfull")
       const {name,email,token}=response
       dispatch(credentials({name,email,token}))
       //dispatch(loggedin(true))
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
    <>
    {!loading?
    <div className="container-fluid p-5" style={{ height: '90vh' }}>
      <div className="row h-100">
        {/* Left Side (Dummy Content) */}
        <div className="col-md-5 bg-primary text-white p-3">
          <h2>Dummy</h2>
          <p>Content</p>
        </div>

        {/* Right Side (SignUp Form) */}
        <div className="col-md-5 p-3">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label"> Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  name="email" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name="cpassword" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmitt}>Sign Up</button>
          </form>

          {/* Already have an account? Login */}
          <div className="mt-3">
            <p className="text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    :<h1>loadig ..</h1>}
    </>
  );
}