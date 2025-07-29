import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { login, refreshToken, authCheck, logout } from "../../api/user/contentAxios";

export const AuthContext= createContext();

export const AuthProvider=({children})=> {
    const [accessToken, setAccessToken]=useState(null);
    const [loading, setLoading]=useState(true);
    const [isAuthenticated, setAuth]=useState(false)
    useEffect(()=>{
        const checkAuth=async ()=> {
            const token=await authCheck()
            setAuth(token)
        }
        refreshToken()
            .then((newAccessToken)=>{
                setAccessToken(newAccessToken);
            })
            .catch(()=> {
                setAccessToken(null)
            })
            .finally(()=>setLoading(false))
        checkAuth()
    }, [])
    const navigate=useNavigate();
    const handleLogin= async (username,password) =>{
        try {
            const data= await login(username, password);
            setAccessToken(data.access);
            setAuth(true);
            navigate('/');
        } catch(error) {
            console.log('entry error', error);
        }
    }
    const handleLogout=()=> {
        logout();
        setAuth(false)
        navigate('/login_form')
    };
    return (
        <AuthContext.Provider value={{isAuthenticated, handleLogin, handleLogout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}