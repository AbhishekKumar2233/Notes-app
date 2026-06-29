import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Note from "../components/Note";
import AddNotes from "../components/AddNotes";
import { getNotes } from "../api/notesApi";
import { decryptNote } from "../utils/dcryption";
import { useLoader } from "../context/LoaderContext";


const Dashboard = () => {
    const [addNoteShow,setAddnoteshow] = useState(false)
    const [notesList,setNoteslist] = useState([])
    const {showLoader,hideLoader} = useLoader()
    const [searchValue,setSearchvalue] = useState('')
    const [apicall,setApicall] = useState(true)

    useEffect(()=>{
        if(apicall == true){
        fetchNotes()
        setApicall(false)
        }
    },[apicall])

    const fetchNotes = async () => {
        try{
         showLoader()
         const response = await getNotes()
         const notes = response.data.map((note) => {
            if (!note.data) {
                return note;
            }
         const decrypted = decryptNote(note.data);
            return {
                ...note,
                title: decrypted.title,
                description: decrypted.description,
            };
         });
            setNoteslist(notes)
        }catch(error){
            console.log('error')
        }finally{
            hideLoader()
        }
    }


    const handleSearch = (e) => {
        setSearchvalue(e.target.value)
    }

    const filteredNotelist = useMemo(()=>{
        return searchValue == '' ? notesList : [...notesList].filter((e)=> e.title.toLowerCase().includes(searchValue.toLowerCase()))

    },[notesList,searchValue])

    console.log(notesList,"notesList")
    return <div className="min-h-screen bg-[#f3f2f8] flex items-center justify-center">
        <div className="bg-white w-[70%] rounded-lg shadow-md">
        <Header />
        {addNoteShow === true ? <AddNotes 
          setAddnoteshow={setAddnoteshow} 
          setApicall={setApicall}/> : 
        <>
            <div className="w-100 h-100 p-4">
                <div className="flex justify-between items-center gap-4">
                <button 
                className="px-8 py-3 bg-white shadow-md border rounded-md" 
                onClick={()=>setAddnoteshow(true)}>Add Note</button>

                <input 
                className="w-[40%] py-2 px-4 border rounded-md shadow-sm bg-[#f7f6fb]" 
                placeholder="Search by note title"
                onChange={(e)=>handleSearch(e)} />
                </div>
            </div>
            <div className="w-full my-0 p-2 px-4 h-96 overflow-y-auto">
            {filteredNotelist?.length > 0 ? filteredNotelist?.map((note)=>(
                <Note 
                key={note.title} 
                note={note} setApicall={setApicall} />
                )) : <p className="text-center mt-4">No data</p>}
            </div>
        </>}
        </div>
    </div>
}
export default Dashboard;