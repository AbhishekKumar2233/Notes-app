import api from "./axios";

export const getNotes = () => {
    return api.get('/notes');
}

export const addNotes = (data) => {
    return api.post('/notes',data)
}

export const deleteNote = (id) => {
    return api.delete(`/notes/${id}`)
}