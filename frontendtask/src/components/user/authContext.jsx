import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { login, refreshToken } from "../../api/user/contentAxios";

export const AuthContext= createContext();

export const AuthProvider=({children})=> {
    const [accessToken, setAccessToken]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        refreshToken()
            .then((newAccessToken)=>{
                setAccessToken(newAccessToken);
            })
            .catch(()=> {
                setAccessToken(null)
            })
            .finally(()=>setLoading(false))
    }, [])
    const handleLogin= async (username,password) =>{
        try {
            const data= await login(username, password);
            setAccessToken(data.access);
        } catch(error) {
            console.log('entry error', error);
        }
    }
    const handleLogout=()=> {
        setAccessToken(null);
    };
    return (
        <AuthContext.Provider value={{accessToken, handleLogin, handleLogout, loading}}>
            {children}
        </AuthContext.Provider>
    )
} 