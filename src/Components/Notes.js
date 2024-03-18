import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


const Notes = (props) => {
  let history = useHistory();
  const {showAlert} = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})

  }

  const handleClick=(e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Succcesfully Updated", "success")

    // console.log("updating a note");
  }
 
  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
              <form className="my-3">
                <div className="form-group my-3">
                  <b> <label for="exampleInputEmail1 ">Title</label></b>
                  <input type="text" className="form-control my-2" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                  <b> <label for="exampleInputPassword1">Description</label></b>
                  <input type="text" className="form-control my-2" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                  <b> <label for="exampleInputEmail1 ">Tag</label></b>
                  <input type="text" className="form-control my-2" id="etag" name="etag" aria-describedby="emailHelp" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className='my-3'>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes
