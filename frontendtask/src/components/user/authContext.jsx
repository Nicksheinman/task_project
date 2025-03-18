import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { login, refreshToken } from "../../api/user/loginAxios";

export const AuthContext= createContext();

export const AuthProvider=({children})=> {
    const [accessToken, setAccessToken]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        refreshToken()
            .then((newAсcessToken)=>{
                setAccessToken(newAсcessToken);
            })
            .catch(()=> {
                setAccessToken(null)
            })
            .finally(()=>setLoading(false))
    }, [])
    const handleLogin= async (email,password) =>{
        try {
            const data= await login(email, password);
            setAccessToken(data.access);
        } catch {
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