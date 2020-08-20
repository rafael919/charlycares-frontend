export const uiMiddleware = ({ dispatch, getState }) => next => action => {
  const arrOfTypes = ['Pending', 'Success', 'Error'];
  const { type } = action;
  arrOfTypes.forEach(item => {
    if (type.endsWith(item)) {
      return dispatch({ type: `ui/${item.toLocaleLowerCase()}` });
    }
  });
  return next(action);
};

export const authorizationMiddleware = ({ getState }) => next => action => {
  const {
    data: { auth },
  } = getState();
  const enhancedAction = {
    ...action,
    role: auth.role,
  };

  next(enhancedAction);
};
