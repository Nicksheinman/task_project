import { useEffect, useContext } from "react";
import { vertifyEmail } from "../../api/user/contentAxios";
import { AuthContext } from "./authContext";

const EmailConfirm=()=>{
    const { navigate } = useContext(AuthContext);
    useEffect(()=>{
        const vertify=async ()=>{
            const token=new URLSearchParams(window.location.search).get('token');
            if (token) {
                const res=await vertifyEmail(token)
                if (res==="Ok") {
                    navigate('/tasks')
                }
            }
        }
        vertify()
    }, [])
}

export default EmailConfirm