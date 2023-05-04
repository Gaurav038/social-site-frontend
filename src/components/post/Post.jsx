import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {currentUser} = useContext(AuthContext)
  const queryClient = useQueryClient()

  const {isLoading, error, data} = useQuery(["Likes", post.id], () => 
    makeRequest.get("/like?postId=" + post.id).then((res) => {
      return res.data
    })
  )

  const {data : comments} = useQuery(["comments"+post.id], () => 
    makeRequest.get("/comment?postId="+post.id).then((res) => {
      return res.data
    })
  )

  const mutation = useMutation((liked) => {
    if(liked) return makeRequest.delete("/like?postId=" + post.id)
    return makeRequest.post("/like", {postId: post.id})
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(["Likes"])
    }
  })

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/post/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["Posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id))
  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.userId === currentUser.id && (
              <button onClick={handleDelete}>delete</button>
            )}        
          </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data && data.includes(currentUser.id)
              ? <FavoriteOutlinedIcon style={{color: "red"}} onClick={handleLike} /> 
              : <FavoriteBorderOutlinedIcon onClick={handleLike} />
            }
            {data && data.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments && comments.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId = {post.id} />}
      </div>
    </div>
  );
};

export default Post;