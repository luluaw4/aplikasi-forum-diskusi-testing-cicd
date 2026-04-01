import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncReceiveThreads,
  asyncToggleThreadVote,
  receiveThreads,
  toggleUpVoteThread,
} from '../../states/threads/action';
import { hideLoading, showLoading } from '../../states/loading/action';

vi.mock('../../utils/api', () => ({
  default: {
    getAllThreads: vi.fn(),
    getAllUsers: vi.fn(),
    upVoteThread: vi.fn(),
    neutralVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
  },
}));

describe('threads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('harus dispatch showLoading, receiveThreads, dan hideLoading ketika mengambil thread berhasil', async () => {
    api.getAllThreads.mockResolvedValue({
      threads: [
        {
          id: 'thread-1',
          title: 'Redux',
          body: '<p>Belajar Redux</p>',
          category: 'redux',
          createdAt: '2025-01-01T10:00:00.000Z',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
          ownerId: 'user-1',
        },
      ],
    });
    api.getAllUsers.mockResolvedValue({
      users: [
        {
          id: 'user-1',
          name: 'Lulu',
          avatar: '',
        },
      ],
    });

    const dispatch = vi.fn();

    await asyncReceiveThreads()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, receiveThreads([
      {
        id: 'thread-1',
        title: 'Redux',
        body: '<p>Belajar Redux</p>',
        category: 'redux',
        createdAt: '2025-01-01T10:00:00.000Z',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
        ownerId: 'user-1',
        owner: {
          id: 'user-1',
          name: 'Lulu',
          avatar: '',
        },
      },
    ]));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('harus melakukan dispatch optimistik dan rollback ketika permintaan vote gagal', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Gagal vote'));

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: {
        id: 'user-1',
      },
      threads: [
        {
          id: 'thread-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });

    await asyncToggleThreadVote({ threadId: 'thread-1', voteType: 'up' })(dispatch, getState);

    expect(dispatch).toHaveBeenNthCalledWith(1, toggleUpVoteThread({
      threadId: 'thread-1',
      userId: 'user-1',
    }));
    expect(dispatch).toHaveBeenNthCalledWith(2, toggleUpVoteThread({
      threadId: 'thread-1',
      userId: 'user-1',
    }));
    expect(window.alert).toHaveBeenCalledWith('Gagal vote');
  });
});
