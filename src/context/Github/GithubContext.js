import { createContext, useReducer } from 'react';
import GithubReducer from './GithubReducer';

// createContext
const GithubContext = createContext();

// variables
// const GITHUB_URL = `https://api.github.com/users`;
const GITHUB_SEARCH_URL = `https://api.github.com/search/users`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users (main functionality)
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const url = `${GITHUB_SEARCH_URL}?${params}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get initial users (for testing)
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}`, {
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

  // set loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    // the Provider give access to the context to its children
    <GithubContext.Provider value={{ users: state.users, loading: state.loading, searchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
