import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import RegisterForm from './views/RegisterForm';
import LoginForm from './views/LoginForm';
import ToDoPage from './views/ToDoPage';
import LogOut from './components/LogOut';
import { useSelector } from 'react-redux';
import HomePage from './views/HomePage';

const App = () => {
  const state = useSelector((state) => state);
  return (
    <Router>
      <div>
        <header class='navbar'>
          <section class='navbar-section'>
            {state.auth.isAuthenticated ? <LogOut /> : null}
          </section>
          <section class='navbar-center'>
            {state.auth.isAuthenticated ? (
              <a href='/todo' className='btn btn-link'>
                Your Todo's
              </a>
            ) : null}
          </section>
          <section class='navbar-section'>
            <a href='/login' class='btn btn-link'>
              Login
            </a>
            <a href='/register' class='btn btn-link'>
              Register
            </a>
          </section>
        </header>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          {state.auth.isAuthenticated ? (
            <Route path='/todo' component={ToDoPage} />
          ) : (
            <Route path='/todo' component={HomePage} />
          )}
          <Route path='/' component={HomePage} />
          <Redirect from='*' to={'/'} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
