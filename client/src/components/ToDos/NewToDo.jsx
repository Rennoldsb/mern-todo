import React, { useState } from 'react';
import axios from 'axios';
import './NewToDo.css';

const NewToDo = (props) => {
  const [todo, setTodo] = useState('');
  const getUser = props.func;

  const newToDo = () => {
    axios({
      method: 'post',
      data: {
        task: todo,
      },
      withCredentials: true,
      url: '/todo',
    })
      .then(() => setTodo(''))
      .then(() => getUser())
      .catch((e) => console.log(e.response.data));
  };

  return (
    <div class='newToDo'>
      <div>
        <label class='form-label text-center' for='newTodo'>
          New ToDo
        </label>
        <input
          value={todo}
          className='form-input'
          onChange={(e) => setTodo(e.target.value)}
          placeholder='New Todo'
          id='newTodo'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              newToDo();
            }
          }}
        />
      </div>
    </div>
  );
};

export default NewToDo;
