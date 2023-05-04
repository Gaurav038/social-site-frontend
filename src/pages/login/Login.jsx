import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate()
  const [err, setErr] = useState(null);
  const {currentUser, login } = useContext(AuthContext);

  const handleChange = (e) => {
      setInputs({...inputs, [e.target.name]: e.target.value})
  }


  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      await login(inputs);
      if(currentUser){
        navigate('/')
      }
    } catch (error) {
      setErr(error.response.data)
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Share your Thoughts/experience and Like, comments on other thoughts and experience.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;