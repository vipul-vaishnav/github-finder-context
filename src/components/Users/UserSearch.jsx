import React, { useState, useContext } from 'react';
import GithubContext from '../../context/Github/GithubContext';
import AlertContext from '../../context/Alert/AlertContext';

const UserSearch = () => {
  const [text, setText] = useState('');

  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleClick = () => clearUsers();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      // search users
      searchUsers(text);

      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input sm:input-lg text-black"
                placeholder="Search..."
                value={text}
                onChange={handleChange}
              />
              <button type="submit" className="absolute top-0 right-0 rounded-l-none w-24 sm:w-36 btn sm:btn-lg">
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
