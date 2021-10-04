import {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = 'http://localhost:5000'
    const notesInitail = [];
    const [notes, setNotes] = useState(notesInitail);

    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/note/get-notes`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('auth'),
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };

    const addNote = async (title, description, tag)=>{
        const response_note = await fetch(`${host}/api/note/add-note`, {
            method: 'POST',
            headers: {
                    "auth-token": localStorage.getItem('auth'),
                    "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
        })

        const response = await response_note.json();
        console.log(response);
        
        const note = {
        user: response.savedNote.user,
        title: response.savedNote.title,
        description: response.savedNote.description,
        tag: response.savedNote.tag,
        _id: response.savedNote._id,
        date: response.savedNote.date,
        __v: response.savedNote.__v
        }
        console.log(note);

        setNotes(notes.concat(note));
    };

    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/note/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": localStorage.getItem('auth'),
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
    }

    const editeNote = async (id, title, description, tag)=>{
        const response_note = await fetch(`${host}/api/note/update-note/${id}`, {
            method: 'PUT',
            headers: {
                    "auth-token": localStorage.getItem('auth'),
                    "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
        })

        const response = await response_note.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        
        for(let i=0; i<newNotes.length; i++){
            const element = notes[i]
            if(element._id===id){
                newNotes[i].title=response.note.title;
                newNotes[i].description=response.note.description;
                newNotes[i].tag=response.note.tag;
                break;
            }
        }
        console.log(newNotes);
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editeNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState