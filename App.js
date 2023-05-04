import React from 'react';
import './App.css';
import { useState } from "react";


function App() {

  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState('');
  const [edit, setEdit] = useState(null);

  //console.log(task)


  function handleInputChange(event) {
    setTask(event.target.value);
    //İnputa girilen değeri ekrana yazdırır
  }

  const handleAddTodo = () => {
    setTodo([...todo, { id: Date.now(), text: task }]);
    setTask("");
    //Set ettikten sonra inputu boş bırakır
  };



  const handleDeleteTodo = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };

  const handleEdit = (id) => {
    setEdit(id);
    const todoToEdit = todo.find((todo) => todo.id === id);
    setTask(todoToEdit.text); // Düzenlenecek öğenin metnini set et
  };

  const handleEditSave = (id) => {
    const editedTodo = todo.find((todo) => todo.id === id);
    editedTodo.text = task;
    setTodo([...todo]);
    setEdit(null);
    setTask("");
  };

  //Fotoğraf ekleme
  const imgEdit = process.env.PUBLIC_URL + '/images/pencil-square.svg';
  const imgDelete =  process.env.PUBLIC_URL + '/images/trash.svg'


  return (
    <div className="App">
      <div className="todo">
        <h1> TODO </h1>

        <div>
          <input
            type="text"
            className="textInput"
            value={task}
            onChange={handleInputChange} />

          <button type="submit" className='addTodo' onClick={handleAddTodo} > ADD </button>

        </div>

        <br />
        <br />

        <div >
          
          <ul className="tasks">
            {todo.map((todo) => (

              <li className='taskList' key={todo.id}>
                {todo.id === edit ? (
                  <>
                  
                    <input className="textInput" type='text' value={task} onChange={handleInputChange} />
                    <button onClick={() => handleEditSave(todo.id)}
                      className='addTodo' >
                      Save
                    </button>
                  </>
                ) : (
                  <>

                    {todo.text}

                    <div>                

                      <button
                        onClick={() => handleEdit(todo.id)}
                        className="edit"
                      >
                        <img src={imgEdit} alt="Edit" />                     
                      </button>

                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="delete"
                      >
                        <img src={imgDelete} alt='Delete'/>
                      </button>
                    </div>
                  </>

                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;




