import { useContext, useEffect, useState } from "react";
import "./rightBar.scss";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import {useNavigate } from "react-router-dom";

const RightBar = () => {

  const [data, setData] = useState()
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const getData = async() => {
    const rslt = await makeRequest.get(`/user/allUser/${currentUser.id}`)
    setData(rslt.data)
  }

  const profilePage = (id) => {
      navigate(`/profile/${id}`)
      window.location.reload(true)
  }

  useEffect(() => {
    getData()
  }, [])
  
  console.log(data);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {data && data.map((user) => {
             return <div key={user.id} className="user">
                <div className="userInfo">
                  <img
                    src={user.profilePic}
                    alt=""
                  />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => profilePage(user.id)} >Follow</button>
                  <button onClick={() => profilePage(user.id)} >UnFollow</button>
                </div>
              </div>
          })
          }
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;