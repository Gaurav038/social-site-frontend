import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

  const login = async(inputs) => {

    const res = await axios.post("https://social-site-backend-production.up.railway.app/api/auth/login", inputs, {
      withCredentials: true, credentials: 'include'
    })
    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login}}>
        {children}
    </AuthContext.Provider>
  )
  
}