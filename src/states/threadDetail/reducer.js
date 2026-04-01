import { ActionType } from './action';

function toggleVotes(item, userId, targetType) {
  const hasUpVote = item.upVotesBy.includes(userId);
  const hasDownVote = item.downVotesBy.includes(userId);

  if (targetType === 'up') {
    return {
      ...item,
      upVotesBy: hasUpVote
        ? item.upVotesBy.filter((id) => id !== userId)
        : [...item.upVotesBy, userId],
      downVotesBy: item.downVotesBy.filter((id) => id !== userId),
    };
  }

  return {
    ...item,
    downVotesBy: hasDownVote
      ? item.downVotesBy.filter((id) => id !== userId)
      : [...item.downVotesBy, userId],
    upVotesBy: item.upVotesBy.filter((id) => id !== userId),
  };
}

function threadDetailReducer(state = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
      };
    case ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD:
      return toggleVotes(state, action.payload.userId, 'up');
    case ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD:
      return toggleVotes(state, action.payload.userId, 'down');
    case ActionType.TOGGLE_UP_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => (
          comment.id === action.payload.commentId
            ? toggleVotes(comment, action.payload.userId, 'up')
            : comment
        )),
      };
    case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => (
          comment.id === action.payload.commentId
            ? toggleVotes(comment, action.payload.userId, 'down')
            : comment
        )),
      };
    default:
      return state;
  }
}

export default threadDetailReducer;
