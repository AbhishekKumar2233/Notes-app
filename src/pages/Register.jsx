import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { validateEmail, validateName, validatePassword } from "../utils/Validation";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import { useLoader } from "../context/LoaderContext";


const RegisterPage = () => {
    const navigate = useNavigate()
    const [form,setForm] = useState({
        username:'',
        email:'',
        password:''
    })
    const {register} = useAuth()
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const {showLoader,hideLoader} = useLoader()


    
        const handleLogin = () => {
            navigate('/login')
        }
    
        const handleRegister = () => {
            navigate('/register')
        }

        const handleChange = (key,value) => {
            setForm((prev)=>{return {...prev,[key]:value}})
                let error = "";
                if (submitted || errors[key]) {
                    if (key === "username") error = validateName(value);
                    if (key === "email") error = validateEmail(value);
                    if (key === "password") error = validatePassword(value);
                }
                setErrors((prev) => ({
                    ...prev,
                    [key]: error,
                }));
        }


        const submitData = async () => {
            setSubmitted(true);

            const newErrors = {
            username: validateName(form.username),
            email: validateEmail(form.email),
            password: validatePassword(form.password),
            };
            setErrors(newErrors);
            if (Object.values(newErrors).some(Boolean)) return;

            try{
                showLoader()
                await register(form)
                toast.success('User created Successfully.')
                navigate('/')
            }catch(error){
                console.log('error',error)
            }finally{
                hideLoader()
            }
        }

     return <div className="min-h-screen  bg-[#f3f2f8] flex items-center justify-center">
        <div className="bg-white w-[40%] rounded-lg shadow-md p-10">
            <h1 className="text-4xl text-center mb-8">Secure Notes</h1>
            <div className="flex bg-gray-100 rounded-md overflow-hidden">
                <button className="flex-1 py-3 bg-[#f3f2f8] text-gray" onClick={()=>handleLogin()}>Login</button>
                <button className="flex-1 py-3 bg-blue-500 text-white" onClick={()=>handleRegister()}>Register</button>
            </div>
            <div className="w-100 mt-6">
                <div className="w-100">
                    <InputField 
                    label="Name" 
                    type="input" 
                    placeholder="Enter your name" 
                    onChange={(e)=>handleChange('username',e.target.value)} 
                    error={errors.username} />
                </div>
                <div className="w-100 mt-4">
                    <InputField 
                    label="Email" 
                    ype="input" 
                    placeholder="Enter email" 
                    onChange={(e)=>handleChange('email',e.target.value)} 
                    error={errors.email} />
                </div>
                <div className="w-100 mt-4">
                    <InputField 
                    label="Password" 
                    type="input" 
                    placeholder="Enter password" 
                    onChange={(e)=>handleChange('password',e.target.value)} 
                    error={errors.password} />
                </div>
                <div className="mt-6">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" onClick={()=>submitData()}>Register</button>
                    <div className="flex justify-center">
                    </div>
                </div>
                
            </div>
        </div>

    </div>
}
export default RegisterPage;