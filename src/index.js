import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Note from "./components/Note";
import noteService from './services/notes'
import axios from "axios";

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true,
//   },
// ]

// const promise = axios.get('http://localhost:3001/notes')

// promise.then( response => {
//   console.log(response)
// })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  // useEffect(() => {
  //   console.log("Effect");

  //   axios
  //   .get("http://localhost:3001/notes")
  //   .then((res) => {
  //     console.log('Promise  fulfilled')
  //     setNotes(res.data)

  //   });
  // }, []);

  
  const hook = () => {
    // console.log("Effect");

    // axios
    // .get("http://localhost:3001/notes")
    // .then((res) => {
    //   console.log('Promise  fulfilled')
    //   setNotes(res.data)
    // })

    noteService
    .getAll()
    .then(resp =>{
      setNotes(resp.data)
    })
}
  
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    // setNotes(notes.concat(noteObject));
    // setNewNote("");
    // console.log("notes", notes);
    // axios 
    // .post('http://localhost:3031/notes', noteObject)
    // .then( resp => {
    //   setNotes(notes.concat(resp.data))
    //   setNewNote('')
    // })


    noteService 
    .create(noteObject)
    .then( resp => {
      setNotes(notes.concat(resp.data))
      setNewNote('')
    })

  };

  const Note = ({note, toggleImportance}) =>{
    const label = note.important ? 'make not important': 'make important'
    return(
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) =>{
    // console.log(`importance of ${id} nees to be toogled`)
    // const url = `http://localhost:3031/notes/${id}`
    const note = notes.find( n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(url, changedNote).then(response =>{
      setNotes(notes.map( note => note.id !== id ? note : response.data))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
