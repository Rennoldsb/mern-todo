import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../state';

const LogOut = () => {
  const dispatch = useDispatch();

  const { authUser } = bindActionCreators(ActionCreators, dispatch);
  let history = useHistory();
  const Logout = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: '/logout',
    })
      .then((res) =>
        authUser({
          isAuthenticated: false,
          user: '',
        })
      )
      .then(history.push('/'));
  };

  return (
    <button onClick={Logout} class='btn btn-link'>
      Logout
    </button>
  );
};

export default LogOut;
