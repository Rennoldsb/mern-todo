import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form/Form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../state';

const LoginForm = () => {
  const [loginUsername, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorData, setErrorData] = useState('');
  let history = useHistory();

  const dispatch = useDispatch();

  const { authUser } = bindActionCreators(ActionCreators, dispatch);

  const login = () => {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: '/login',
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
      <h1 className='title'> Login </h1>
      <Form
        f1={setLoginName}
        f2={setLoginPassword}
        runOnClick={login}
        errorData={errorData}
        name='Login'
      />
    </React.Fragment>
  );
};

export default LoginForm;
