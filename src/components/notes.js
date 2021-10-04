import React, { useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Notes(props) {
    const context = useContext(noteContext)
    const { deleteNote} = context;   

    const {note, openModal} = props;

    return (
        <>
            <div className="col-sm-4 my-2">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <h5 className="card-title col-7">{note.title}</h5>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={() => { deleteNote(note._id) }} className="btn btn-danger">Delete Note</button>
                            <button type="button" onClick={() => { openModal(note) }} className="btn btn-info ">Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
