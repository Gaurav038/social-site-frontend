import { useQuery } from "@tanstack/react-query";
import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  
  const {isLoading, error, data} = useQuery(["Posts"], () => 
        makeRequest.get("/post?userId="+userId).then((res) => {
          return res.data
        })
  )
       

  return <div className="posts">
    {error
      ? <div className="info-warn" > Please follow some users to see the Updated Posts</div>
      : isLoading
      ? <div className="info-warn" >Loading ...</div>
      : data.map((post) => {
        return <Post post={post} key={post.id} />
      })
    }
    {data && data.length < 1 && <div className="info-warn" > Please follow some users to see the Updated Posts</div>}
  </div>;
};

export default Posts;