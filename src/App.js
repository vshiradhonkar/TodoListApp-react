
import { useEffect, useState } from 'react';
import './App.css';
import { Button , FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import { db } from './firebase';
import firebase from "firebase/compat/app";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Navbar from './Navbar';


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
      <Navbar />
      <div className='gradient-background'>
      <form>
      
        <FormControl >
          <InputLabel>Write a task</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained"><AddCircleOutlinedIcon/><b> Add Task</b></Button>
        
      </form>
        
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
        </div>
    </div>
  );
}

export default App;
