import React from "react";
import { deleteNote } from "../api/notesApi";
import { useLoader } from "../context/LoaderContext";
import toast from "react-hot-toast";


const Note = ({note}) => {
    const {showLoader,hideLoader} = useLoader()

    const deleteNotefunc = async (id) => {
        try{
            showLoader()
            const response = await deleteNote(id)
            console.log(response)
            toast.success("Note deleted successfully.");
        }catch(error){
            console.log(error)
        }finally{
            hideLoader()
        }
    }
    return <div className="w-full border rounded-lg shadow-md p-4 my-4 flex justify-between">
        <div className="flex-1">
            <h1 className="text-xl">{note?.title}</h1>
            <p className="text-[gray] mt-2">{note?.description}</p>
        </div>
        <div className="flex items-center">
        <button 
        onClick={()=>deleteNotefunc(note._id)}
        >
            <img 
            width="28px" 
            height="auto" 
            src="https://img.icons8.com/ios-glyphs/30/4D4D4D/filled-trash.png" />
            </button>
        </div>
    </div>
}

export default Note;