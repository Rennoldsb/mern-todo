import React, { useEffect, useState } from 'react';
import NewToDo from '../components/ToDos/NewToDo';
import ToDoList from '../components/ToDos/ToDoList';
import axios from 'axios';
import HomePage from './HomePage';

const ToDoPage = () => {
  const [data, setData] = useState([]);

  const GetUser = async () => {
    const response = await axios({
      method: 'get',
      withCredentials: true,
      url: '/user',
    });
    setData(response.data.todos);
  };

  useEffect(() => {
    GetUser();
  }, []);

  if (data === undefined) {
    return <HomePage />;
  }
  return (
    <React.Fragment>
      <NewToDo func={GetUser} />
      <ToDoList data={data} func={GetUser} />
    </React.Fragment>
  );
};

export default ToDoPage;
