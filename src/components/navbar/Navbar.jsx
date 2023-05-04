import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [isActive, setActive] = useState("false");
  const navigate = useNavigate()

  const handleToggle = () => {
    setActive(!isActive);
  };

  const logOutFunct = async() => {
    await makeRequest.post("/auth/logOut")
    localStorage.removeItem('user');
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><img src="/social.png" /></span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        {currentUser 
        ? <div className="user" onClick={handleToggle} style={{cursor: 'pointer'}}>
          <img
            src={currentUser.profilePic || "/prof.png"}
            alt=""
          />
          <span>{currentUser.name}</span>
         </div>
        : <>
            <Link className="link-login" to="/login">
              Login
            </Link>
            <Link className="link-login" to="/register">
              SignUp
            </Link>
          </>
        }

      <div className={isActive ? 'sub-menu-wrap' : 'sub-menu-wrap open-menu'}>

      <div className='sub-menu'>
          <Link onClick={()=>setActive(!isActive)} to={`/profile/${currentUser.id}`} className='sub-menu-link'>
              <AccountBoxIcon />
              <p>Profile</p>
              <span> {'>'} </span>
          </Link>

          <div onClick={logOutFunct} className='sub-menu-link'>
              <LogoutIcon />
              <p>Logout</p>
              <span> {'>'} </span>
          </div>
      </div>
      </div>


      </div>
    </div>
  );
};

export default Navbar;