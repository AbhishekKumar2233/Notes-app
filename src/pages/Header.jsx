import React from "react";
import { useNavigate } from "react-router-dom";



const Header = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return <div className="flex justify-between items-center bg-blue-500 px-6 py-4 text-white">
        <h1 className="text-xl text-bold">Secure Notes</h1>
        <button className="flex gap-2" 
        onClick={()=>logout()}>Logout <img 
        width="25px" 
        height="auto" 
        src="https://img.icons8.com/material-rounded/24/FFFFFF/user-male-circle.png" 
        /></button>
    </div>
}
export default Header;