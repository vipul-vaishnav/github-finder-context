import { createContext, useReducer } from 'react';
import GithubReducer from './GithubReducer';

// createContext
const GithubContext = createContext();

// variables
// const GITHUB_USERS_URL = `https://api.github.com/users`;

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get initial users (for testing)
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_USERS_URL}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });

  //   const data = await response.json();

  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   });
  // };

  return (
    // the Provider give access to the context to its children
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
