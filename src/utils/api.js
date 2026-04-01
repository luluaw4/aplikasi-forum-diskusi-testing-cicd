const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function putAccessToken(token) {
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

async function fetchWithAuth(url, options = {}) {
  const token = getAccessToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.user || responseJson.data.registeredUser || responseJson.data;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.token || responseJson.data.accessToken || responseJson.data;
}

async function getOwnProfile() {
  return fetchWithAuth(`${BASE_URL}/users/me`);
}

async function getAllThreads() {
  return fetchWithAuth(`${BASE_URL}/threads`);
}

async function getAllUsers() {
  return fetchWithAuth(`${BASE_URL}/users`);
}

async function getThreadDetail(threadId) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}`);
}

async function createThread({ title, body, category }) {
  const data = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    body: JSON.stringify({ title, body, category }),
  });

  return data.thread || data.addedThread || data;
}

async function createComment({ threadId, content }) {
  const data = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });

  return data.comment || data.addedComment || data;
}

async function getLeaderboards() {
  return fetchWithAuth(`${BASE_URL}/leaderboards`);
}

async function upVoteThread(threadId) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
  });
}

async function downVoteThread(threadId) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
  });
}

async function neutralVoteThread(threadId) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });
}

async function upVoteComment({ threadId, commentId }) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
  });
}

async function downVoteComment({ threadId, commentId }) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
  });
}

async function neutralVoteComment({ threadId, commentId }) {
  return fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
  });
}

const api = {
  putAccessToken,
  getAccessToken,
  register,
  login,
  getOwnProfile,
  getAllThreads,
  getAllUsers,
  getThreadDetail,
  createThread,
  createComment,
  getLeaderboards,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
};

export default api;
