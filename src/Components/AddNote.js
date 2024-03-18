import React, {useContext, useState} from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
  const {showAlert} = props;
   const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const handleClick=(e)=>{  
      e.preventDefault()
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""})
      props.showAlert("Note Succcesfully Added", "success")

  }
  const onChange=(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h2 className="my-3">Add a Note</h2>
        <form className="my-3">
          <div className="form-group my-3">
           <b> <label for="exampleInputEmail1 ">Title</label></b>
            <input type="text" className="form-control my-2" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
          </div>
          <div className="form-group my-3">
           <b> <label for="exampleInputPassword1">Description</label></b>
            <input type="text" className="form-control my-2" id="description" name="description" value={note.description} onChange={onChange}/>
          </div>
          <div className="form-group my-3">
           <b> <label for="exampleInputEmail1 ">Tag</label></b>
            <input type="text" className="form-control my-2" id="tag" name="tag" aria-describedby="emailHelp" value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
