import { describe, expect, it } from 'vitest';
import threadsReducer from '../../states/threads/reducer';
import { ActionType } from '../../states/threads/action';

const sampleThread = {
  id: 'thread-1',
  title: 'Belajar Redux',
  body: '<p>Materi Redux</p>',
  category: 'redux',
  createdAt: '2025-01-01T10:00:00.000Z',
  totalComments: 2,
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'user-1',
    name: 'Lulu',
    avatar: '',
  },
};

describe('threadsReducer', () => {
  it('harus mengembalikan daftar thread ketika menerima action RECEIVE_THREADS', () => {
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [sampleThread],
      },
    };

    const nextState = threadsReducer([], action);

    expect(nextState).toEqual([sampleThread]);
  });

  it('harus menambahkan thread baru di posisi terdepan ketika menerima action ADD_THREAD', () => {
    const currentState = [sampleThread];
    const addedThread = {
      ...sampleThread,
      id: 'thread-2',
      title: 'Thread terbaru',
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: addedThread,
      },
    };

    const nextState = threadsReducer(currentState, action);

    expect(nextState).toEqual([addedThread, sampleThread]);
  });
});
