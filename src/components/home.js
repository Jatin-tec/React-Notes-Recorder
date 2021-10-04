import React, {useState, useContext} from "react";
import NotesContainer from "./notesContainer";
import noteContext from '../context/notes/noteContext'

export default function Home() {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({title:"", description:"", tag:"default"})

  const handleAdd = (e)=>{
    e.preventDefault();
    console.log(note.title, note.description, note.tag);
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className="container my-4">
        <div className="mb-2">
          <h5>Title</h5>
          <textarea
            className="form-control my-2"
            style={{
              marginTop: "8px",
              marginBottom: "8px",
              height: "48px",
            }}
            name="title"
            value={note.title}
            onChange={onChange}
            id="noteTitle"
          ></textarea>

          <h5>Enter Note</h5>
          <textarea
            className="form-control"
            style={{ marginTop: "0px", marginBottom: "0px", height: "183px" }}
            name="description"
            value={note.description}
            onChange={onChange}
            id="noteText"
          ></textarea>

          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-outline-success my-4"
          >
            Add Note
          </button>
        </div>
      </div>
      <NotesContainer />
    </>
  );
}
