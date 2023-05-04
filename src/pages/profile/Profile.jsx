import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts"
import { useLocation } from "react-router-dom";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update"

const Profile = () => {

  const userId = parseInt(useLocation().pathname.split("/")[2])
  const {currentUser} = useContext(AuthContext)
  const [openUpdate, setOpenUpdate] = useState(false)
  const queryClient = useQueryClient()

  const {isLoading, error, data} = useQuery(["Users"], ()=> 
    makeRequest.get("/user/find/" + userId).then((res) => {
      return res.data
    })
  )

  const {data: relationData} = useQuery(["Relations"], ()=> 
    makeRequest.get("/relation?userId=" + userId).then((res) => {
      return res.data
    })
  )

  const mutation = useMutation((follow) => {
    if(follow) return makeRequest.delete("/relation?userId=" + userId)
    return makeRequest.post("/relation", {userId})
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(["Relations"])
    }
  })

  const handleFollow = () => {
    mutation.mutate(relationData.includes(currentUser.id))
  }

  return (
    <div className="profile">
      {isLoading
      ? "loading........" 
      : <>
      <div className="images">
        <img
          src={data.coverPic || "/back-ground.jpg"}
          alt=""
          className="cover"
        />
        <img
          src={data.profilePic || "/prof.png"}
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
              {data.about}
          </div>
          <div className="center">
            <span>{data.name}</span>
            
            { userId === currentUser.id
              ? <button onClick={()=> setOpenUpdate(true)} >Update</button>
              : <button onClick={handleFollow}>
                {relationData && relationData.includes(currentUser.id)
                  ? "Following"
                  : "Follow"
                }
                </button>
          }
          </div>
          <div className="right">
          <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.email}</span>
              </div>
            </div>
          </div>
        </div>
      <Posts userId = {userId}/>
      </div>
      </>
      }
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={currentUser} />}
    </div>
  );
};

export default Profile;