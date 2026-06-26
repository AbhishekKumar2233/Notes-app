import React, { useState } from "react";
import InputField from "./InputField";
import { addNotes, getNotes } from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import { encryptNote } from "../utils/encryption";
import { validateDescription, validateTitle } from "../utils/Validation";
import { useLoader } from "../context/LoaderContext";
import toast from "react-hot-toast";
import TextAreaField from "./TextAreaField";


const AddNotes = ({setAddnoteshow,fetchNotes}) => {
    const [noteForm,setNoteform] = useState({
        title:'',
        description:''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const {showLoader,hideLoader} = useLoader()

    const handleChange = (key,value) => {
        setNoteform((prev)=>{return{...prev,[key]:value}})
        let error = "";
        if (submitted || errors[key]) {
            if (key === "title") error = validateTitle(value);
            if (key === "description") error = validateDescription(value);
        }
        setErrors((prev) => ({
            ...prev,
            [key]: error,
        }));
    }

    const submitNote = async () => {
        const newErrors = {
        title: validateTitle(noteForm.title),
        description: validateDescription(noteForm.description),
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;
        try{
            showLoader()
            console.log(noteForm,"noteForm")
            let encryptednote = {data:encryptNote(noteForm)}
            const response = await addNotes(encryptednote)
            console.log(response)
            toast.success("Note added successfully.");
            setAddnoteshow(false)
        }catch(error){
            console.log(error,'error')
        }finally{
            hideLoader()
        }
    }
    console.log(noteForm,"noteForm1")

    return <div className="m-5">
        <div className="flex gap-2">
        <h1 className="text-2xl">Add Note</h1>
        </div>
        <div>
            <InputField 
            type="text" 
            label="Title" 
            placeholder="Enter title" 
            onChange={(e)=>handleChange('title',e.target.value)} 
            error={errors.title} />

            <TextAreaField 
            type="text" 
            label="Description" 
            placeholder="Enter description" 
            onChange={(e)=>handleChange('description',e.target.value)} 
            error={errors.description}  />

            <div className="flex justify-between mt-4">
                <button 
                className="py-2 px-4 border rounded-md" 
                onClick={()=>setAddnoteshow(false)}>Cancel</button>
                <button 
                className="py-2 px-4 bg-blue-500 text-white border rounded-md hover:bg-blue-600" 
                onClick={()=> submitNote()}>Save</button>
            </div>
        </div>
    </div>
}
export default AddNotes;