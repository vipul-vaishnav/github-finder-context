// variables
// const GITHUB_USERS_URL = `https://api.github.com/users`;
const GITHUB_SEARCH_URL = `https://api.github.com/search/users`;
const GITHUB_USER_URL = `https://api.github.com/users`;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Search Users (main functionality)
export const searchUsers = async (text) => {
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

  return items;
};

// Search Single User (for profile information)

export const getUser = async (login) => {
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

    return data;
  }
};

// Search User Repos (for github repos)

export const getUserRepos = async (login) => {
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

  return data;
};
