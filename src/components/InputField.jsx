import React from "react";


const InputField = ({label,type,placeholder,value,onChange,error}) => {
    return <div className="w-100 mt-4">
        <label className="block text-[16px] text-gray-700 font-medium">{label}</label>
        <input className={`py-2 px-2 my-2 w-[100%] border rounded outline-none ${error ? 'border-red-500' : 'border'}`} 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} />
        {error && (<p className="text-sm text-red-500">{error}</p>)}
    </div>
}
export default InputField;