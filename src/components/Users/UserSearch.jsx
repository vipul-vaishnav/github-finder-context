import React, { useState, useContext } from 'react';
import GithubContext from '../../context/Github/GithubContext';
import AlertContext from '../../context/Alert/AlertContext';
import { searchUsers } from '../../context/Github/GithubActions';

const UserSearch = () => {
  const [text, setText] = useState('');

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleClick = () => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      // search users
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });

      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 mb-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 text-black bg-gray-200 input sm:input-lg"
                placeholder="Search..."
                value={text}
                onChange={handleChange}
              />
              <button type="submit" className="absolute top-0 right-0 w-24 rounded-l-none sm:w-36 btn sm:btn-lg">
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users?.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClick}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
