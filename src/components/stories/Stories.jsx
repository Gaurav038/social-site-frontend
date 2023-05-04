import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddStory from "./AddStory";

const Stories = () => {

  const {currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [openUpdate, setOpenUpdate] = useState(false)


  const { isLoading, error, data : stories} = useQuery(["Stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );


  

  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic || "/prof.png"} alt="" />
          <span>{currentUser.name}</span>
          <button onClick={()=> setOpenUpdate(true)}>+</button>
        </div>
      {stories && stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
      
    {openUpdate && <AddStory setOpenUpdate={setOpenUpdate} user={currentUser} />}

    </div>
  )
}

export default Stories