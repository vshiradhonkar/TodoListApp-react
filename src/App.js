
import { useEffect, useState } from 'react';
import './App.css';
import { Button , FormControl, Input, InputLabel } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import Todo from './Todo';
import { db } from './firebase';
import firebase from "firebase/compat/app";


function App() {
  const [todos, setTodos] = useState([]);
  const[input, setInput] = useState('');
//when app loads, we need to listen to db and fetch new todos as they are added/removed.
  useEffect(()=>{
    // this loads when app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc =>({id:doc.id ,todo: doc.data().todo})))})
  }, []);

  const addTodo= (event)=>{
    //this will start the button
    event.preventDefault();


    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setTodos([...todos, input]);
    setInput("");
  };


  return (
    <div className="App">
    <h1>
      <ListIcon className='heading_icon'/> To-Do List
    </h1>
      <form>

        <FormControl>
          <InputLabel>Write a task</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary"> ➕Add Task</Button>
        
        </form>
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
      
    </div>
  );
}

export default App;
