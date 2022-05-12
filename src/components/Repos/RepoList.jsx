import React from 'react';
import RepoItem from './RepoItem';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const RepoList = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100 ">
      <div className="card-body">
        <h2 className="my-4 text-3xl font-bold card-title">Top Repositories</h2>
        {repos.map((repo) => {
          return <RepoItem key={uuidv4()} repo={repo} />;
        })}
      </div>
    </div>
  );
};

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
