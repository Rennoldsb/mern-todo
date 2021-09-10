import React from 'react';
import ErrorToast from '../ErrorToast';
import './Form.css';

function Form(props) {
  return (
    <div className='column col-6 col-xs-12 vert-middle'>
      <form className='form-vertical'>
        <div className='form-group'>
          <label class='form-label' for='registerEmail'>
            Email
          </label>
          <input
            class='form-input'
            onChange={(e) => props.f1(e.target.value)}
            type='email'
            placeholder='Email'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,14}$'
            id='registerEmail'
          />
        </div>
        <div className='form-group'>
          <label class='form-label' for='registerPassword'>
            Password
          </label>
          <input
            class='form-input'
            onChange={(e) => props.f2(e.target.value)}
            type='password'
            placeholder='Password'
            pattern='^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!-_@#$%^&*]{7,32}$'
            id='registerPassword'
          />
        </div>
      </form>
      <div className='button'>
        <button className='btn' onClick={props.runOnClick}>
          {props.name}
        </button>
      </div>
      <div className='error'>
        {props.errorData ? <ErrorToast error={props.errorData} /> : ''}
      </div>
    </div>
  );
}

export default Form;
