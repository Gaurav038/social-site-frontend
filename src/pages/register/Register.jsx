import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios"
import { makeRequest } from "../../axios";


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  })
  const [err, setErr] = useState(null);
  const navigate = useNavigate()
  const handleChange = (e) => {
      setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const submitForm = async(e)=> {
    e.preventDefault()
    try {
      await makeRequest.post("/auth/register", inputs);
      navigate('/login')
    } catch (err) {
      setErr(err.response.data);
    }
  }
  console.log(inputs);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Share Now.</h1>
          <p>
          Share your Thoughts/experience and Like, comments on other thoughts and experience.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            {err && err}
            <button onClick={submitForm} >Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;