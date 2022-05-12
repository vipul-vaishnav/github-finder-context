import { createContext, useState } from 'react';

//createContext
const GithubContext = createContext();

const GITHUB_URL = `https://api.github.com/users`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return (
    // the Provider give access to the context to its children
    <GithubContext.Provider value={{ users, loading, fetchUsers }}>{children}</GithubContext.Provider>
  );
};

export default GithubContext;
