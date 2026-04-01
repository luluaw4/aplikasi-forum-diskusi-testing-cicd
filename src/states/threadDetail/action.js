import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
};

function receiveThreadDetail(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetail() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addComment(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteComment({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteComment({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleUpVoteDetailThread({ userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteDetailThread({ userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());
    try {
      const data = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(data.detailThread || data.thread || data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }

    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      const completeComment = {
        ...comment,
        owner: {
          id: authUser.id,
          name: authUser.name,
          avatar: authUser.avatar,
        },
        upVotesBy: [],
        downVotesBy: [],
      };
      dispatch(addComment(completeComment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDetailThreadVote(voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }

    const hasUpVote = threadDetail.upVotesBy.includes(authUser.id);
    const hasDownVote = threadDetail.downVotesBy.includes(authUser.id);

    if (voteType === 'up') {
      dispatch(toggleUpVoteDetailThread({ userId: authUser.id }));
    }

    if (voteType === 'down') {
      dispatch(toggleDownVoteDetailThread({ userId: authUser.id }));
    }

    try {
      if (voteType === 'up') {
        if (hasUpVote) {
          await api.neutralVoteThread(threadDetail.id);
        } else {
          await api.upVoteThread(threadDetail.id);
        }
      }

      if (voteType === 'down') {
        if (hasDownVote) {
          await api.neutralVoteThread(threadDetail.id);
        } else {
          await api.downVoteThread(threadDetail.id);
        }
      }
    } catch (error) {
      if (voteType === 'up') {
        dispatch(toggleUpVoteDetailThread({ userId: authUser.id }));
      }

      if (voteType === 'down') {
        dispatch(toggleDownVoteDetailThread({ userId: authUser.id }));
      }

      alert(error.message);
    }
  };
}

function asyncToggleCommentVote({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }

    const targetComment = threadDetail.comments.find((comment) => comment.id === commentId);
    const hasUpVote = targetComment.upVotesBy.includes(authUser.id);
    const hasDownVote = targetComment.downVotesBy.includes(authUser.id);

    if (voteType === 'up') {
      dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
    }

    if (voteType === 'down') {
      dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
    }

    try {
      if (voteType === 'up') {
        if (hasUpVote) {
          await api.neutralVoteComment({ threadId, commentId });
        } else {
          await api.upVoteComment({ threadId, commentId });
        }
      }

      if (voteType === 'down') {
        if (hasDownVote) {
          await api.neutralVoteComment({ threadId, commentId });
        } else {
          await api.downVoteComment({ threadId, commentId });
        }
      }
    } catch (error) {
      if (voteType === 'up') {
        dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
      }

      if (voteType === 'down') {
        dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
      }

      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpVoteComment,
  toggleDownVoteComment,
  toggleUpVoteDetailThread,
  toggleDownVoteDetailThread,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleDetailThreadVote,
  asyncToggleCommentVote,
};
