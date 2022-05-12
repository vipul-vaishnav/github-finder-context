import { createContext, useReducer } from 'react';
import GithubReducer from './GithubReducer';

// createContext
const GithubContext = createContext();

// variables
// const GITHUB_USERS_URL = `https://api.github.com/users`;
const GITHUB_SEARCH_URL = `https://api.github.com/search/users`;
const GITHUB_USER_URL = `https://api.github.com/users`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  // Search Single User (for profile information)

  const getUser = async (login) => {
    setLoading();

    const url = `${GITHUB_USER_URL}/${login}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // Search User Repos (for github repos)

  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      q: 'created',
      sort: 'star',
      order: 'desc',
      per_page: 10,
    });

    const url = `${GITHUB_USER_URL}/${login}/repos?${params}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: 'GET_USER_REPOS',
      payload: data,
    });
  };

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

  // set loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  // clear the search results
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  return (
    // the Provider give access to the context to its children
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
