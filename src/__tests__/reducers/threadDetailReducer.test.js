import { describe, expect, it } from 'vitest';
import threadDetailReducer from '../../states/threadDetail/reducer';
import { ActionType } from '../../states/threadDetail/action';

const baseThreadDetail = {
  id: 'thread-1',
  title: 'Diskusi Testing',
  body: '<p>Isi thread</p>',
  category: 'testing',
  createdAt: '2025-01-01T10:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'Lulu',
    avatar: '',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Komentar lama',
      createdAt: '2025-01-01T11:00:00.000Z',
      owner: {
        id: 'user-2',
        name: 'Dimas',
        avatar: '',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer', () => {
  it('harus menyimpan detail thread ketika menerima action RECEIVE_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: baseThreadDetail,
      },
    };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(baseThreadDetail);
  });

  it('harus menambahkan komentar baru ke awal daftar komentar ketika menerima action ADD_COMMENT', () => {
    const newComment = {
      id: 'comment-2',
      content: 'Komentar baru',
      createdAt: '2025-01-01T12:00:00.000Z',
      owner: {
        id: 'user-3',
        name: 'Budi',
        avatar: '',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    const nextState = threadDetailReducer(baseThreadDetail, action);

    expect(nextState.comments[0]).toEqual(newComment);
    expect(nextState.comments).toHaveLength(2);
  });
});
