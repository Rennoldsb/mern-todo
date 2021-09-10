const initialState = {
  isAuthenticated: false,
  user: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth':
      return (state = action.payload);
    case 'logout':
      return state;
    default:
      return state;
  }
};

export default authReducer;
