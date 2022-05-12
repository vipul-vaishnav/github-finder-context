import React, { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../Layout/Spinner';
import UserItem from '../Users/UserItem';
import GithubContext from '../../context/Github/GithubContext';

const UserResults = () => {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users?.map((user) => {
          return <UserItem key={uuidv4()} user={user} />;
        })}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
