import React from 'react';

function ErrorToast(props) {
  return <div class='toast toast-error'>{props.error}</div>;
}

export default ErrorToast;
