import React, { useContext, useEffect, useState, useRef } from "react";
import Notes from "./notes";
import noteContext from '../context/notes/noteContext'
import { useHistory } from "react-router-dom";

export default function NotesContainer() {
  const context = useContext(noteContext)
  const { notes, getNotes, editeNote} = context;
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem('auth')){
      getNotes();
    }
    else{
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [])

  
  const refOpenmodal = useRef(null);
  const refClosemodal = useRef(null);

  const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" })

  const openModal = (currentNote) => {
    refOpenmodal.current.click();
    setNote({ eid:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag });
  }

  const handelUpdate = () => {
    editeNote(note.eid, note.etitle, note.edescription, note.etag);
    setNote(notes);
    refClosemodal.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={refOpenmodal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h5>Title</h5>
              <textarea
                className="form-control my-2"
                style={{
                  marginTop: "8px",
                  marginBottom: "8px",
                  height: "48px",
                }}
                id="etitle"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
              ></textarea>

              <h5>Enter Note</h5>
              <textarea
                className="form-control"
                style={{ marginTop: "0px", marginBottom: "0px", height: "183px" }}
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
              ></textarea>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClosemodal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={()=>{handelUpdate()}} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        {notes.length===0 && <h3>No notes to display</h3>}
      </div>

      <div className="container">
        <div className="row">
          {notes.map((note) => {
            return <Notes key={note._id} note={note} openModal={openModal} />
          })}
        </div>
      </div>
    </>
  );
}
