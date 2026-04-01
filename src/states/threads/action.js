import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveThreads(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThread(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThread({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThread({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function mapThreadsWithOwners(threads, users) {
  const usersMap = new Map(users.map((user) => [user.id, user]));

  return threads.map((thread) => {
    const owner = usersMap.get(thread.ownerId);

    return {
      ...thread,
      owner: thread.owner || {
        id: owner?.id || thread.ownerId || 'unknown-owner',
        name: owner?.name || 'Pengguna',
        avatar: owner?.avatar || '',
      },
    };
  });
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [threadsData, usersData] = await Promise.allSettled([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);

      if (threadsData.status !== 'fulfilled') {
        throw threadsData.reason;
      }

      const threads = threadsData.value.threads || threadsData.value;
      const users = usersData.status === 'fulfilled'
        ? usersData.value.users || usersData.value
        : [];

      dispatch(receiveThreads(mapThreadsWithOwners(threads, users)));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category, navigate }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThread(thread));
      navigate(`/threads/${thread.id}`);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleThreadVote({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }

    const targetThread = threads.find((thread) => thread.id === threadId);
    const hasUpVote = targetThread.upVotesBy.includes(authUser.id);
    const hasDownVote = targetThread.downVotesBy.includes(authUser.id);

    if (voteType === 'up') {
      dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
    }

    if (voteType === 'down') {
      dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
    }

    try {
      if (voteType === 'up') {
        if (hasUpVote) {
          await api.neutralVoteThread(threadId);
        } else {
          await api.upVoteThread(threadId);
        }
      }

      if (voteType === 'down') {
        if (hasDownVote) {
          await api.neutralVoteThread(threadId);
        } else {
          await api.downVoteThread(threadId);
        }
      }
    } catch (error) {
      if (voteType === 'up') {
        dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
      }

      if (voteType === 'down') {
        dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
      }

      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleThreadVote,
};
