// Register User
export const authUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: 'auth',
      payload: userData,
    });
  };
};
