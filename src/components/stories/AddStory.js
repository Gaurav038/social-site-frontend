import React, { useState } from 'react'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddStory({setOpenUpdate, user}) {
    const [status, setStatus] = useState(null);
    const queryClient = useQueryClient();


    const mutation = useMutation(
        (user) => {
          return makeRequest.post("/stories", user);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["Stories"]);
          },
        }
    );

      const upload = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

    const handleClick = async (e) => {
        e.preventDefault();
        
        let statusUrl = await upload(status);
        
        mutation.mutate({ img : statusUrl });
        setOpenUpdate(false);
        setStatus(null);
    }

  return (
    <div className="update">
      <div style={{height: '16rem'}} className="wrapper">
        <h1>Update Your Status</h1>
        <form>
          <div className="files">
                <label htmlFor="status">
                <span>Status Picture</span>
                <div className="imgContainer">
                    <img
                    src={
                        status
                        ? URL.createObjectURL(status)
                        : "/upload/" + user.statusPic
                    }
                    alt=""
                    />
                    <CloudUploadIcon className="icon" />
                </div>
                </label>
           </div>
            <input
              type="file"
              id="status"
              style={{ display: "none" }}
              onChange={(e) => setStatus(e.target.files[0])}
            />
            <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default AddStory