import React, { useState } from 'react';
import axios from 'axios';
import './ToDoList.css';

const ToDoList = (props) => {
  const [errorData, setErrorData] = useState('');
  const dataArray = props.data;
  const getUser = props.func;

  const removeTodo = (id) => {
    return function () {
      axios({
        method: 'delete',
        withCredentials: true,
        url: `/todo/delete/${id}`,
      })
        .then(() => getUser())
        .catch((e) => {
          setErrorData(e);
          console.log(errorData);
        });
    };
  };

  return (
    <div>
      <p>
        {dataArray.map((todo, i) => {
          return (
            <div
              onClick={removeTodo(todo._id)}
              key={i}
              className='tile tasklist'
            >
              <div class='tile-content'>
                <p class='tile-title center'>
                  <h3>
                    <strong>Task</strong>: {todo.task}
                  </h3>
                </p>
              </div>
              <div class='tile-action'>
                <button
                  onClick={removeTodo(todo._id)}
                  class='btn btn-primary center'
                >
                  Delete ToDo
                </button>
              </div>
            </div>
          );
        })}
      </p>
    </div>
  );
};

export default ToDoList;
