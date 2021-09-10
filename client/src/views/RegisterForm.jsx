import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form/Form';
import { useHistory } from 'react-router-dom';
import { ActionCreators } from '../state';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const RegisterForm = () => {
  const [registerUsername, setRegisterUserName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errorData, setErrorData] = useState('');
  const dispatch = useDispatch();
  const { authUser } = bindActionCreators(ActionCreators, dispatch);
  let history = useHistory();

  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: '/register',
    })
      .then((res) => {
        if (res.status === 200) {
          history.push('/todo');
          authUser({
            isAuthenticated: true,
            user: res.data,
          });
        }
      })
      .catch((e) => setErrorData(e.response.data));
  };

  return (
    <React.Fragment>
      <h1 className='title'> Register </h1>
      <Form
        f1={setRegisterUserName}
        f2={setRegisterPassword}
        runOnClick={register}
        errorData={errorData}
        name='Register!'
      />
    </React.Fragment>
  );
};

export default RegisterForm;
