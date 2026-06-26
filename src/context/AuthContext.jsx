import { createContext,useContext,useState } from "react";
import * as authApi from "../api/authApi";
import {saveToken,logout} from "../services/authServices"

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user,setUser] = useState(null);

    const login = async (credential) => {
        try{
        const res = await authApi.login(credential)
        console.log(res,"resresresres")
        saveToken(res.data.token)
        setUser(res.data.user.emailId)
        }catch(error){
            throw error
        }
    }

    const register = async (credential) => {
        try{
        const res = await authApi.register(credential)
        saveToken(res.data.token)
        setUser(res.data.user.emailId)
        }catch(error){
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{login,user,register}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)