import { ActionType } from './action';

function updateVotes(thread, userId, targetType) {
  const hasUpVote = thread.upVotesBy.includes(userId);
  const hasDownVote = thread.downVotesBy.includes(userId);

  if (targetType === 'up') {
    return {
      ...thread,
      upVotesBy: hasUpVote
        ? thread.upVotesBy.filter((id) => id !== userId)
        : [...thread.upVotesBy, userId],
      downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
    };
  }

  return {
    ...thread,
    downVotesBy: hasDownVote
      ? thread.downVotesBy.filter((id) => id !== userId)
      : [...thread.downVotesBy, userId],
    upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
  };
}

function threadsReducer(state = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...state];
    case ActionType.TOGGLE_UP_VOTE_THREAD:
      return state.map((thread) => (
        thread.id === action.payload.threadId
          ? updateVotes(thread, action.payload.userId, 'up')
          : thread
      ));
    case ActionType.TOGGLE_DOWN_VOTE_THREAD:
      return state.map((thread) => (
        thread.id === action.payload.threadId
          ? updateVotes(thread, action.payload.userId, 'down')
          : thread
      ));
    default:
      return state;
  }
}

export default threadsReducer;
