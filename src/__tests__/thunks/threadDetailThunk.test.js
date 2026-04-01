import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  addComment,
  asyncAddComment,
  asyncReceiveThreadDetail,
  clearThreadDetail,
  receiveThreadDetail,
} from '../../states/threadDetail/action';
import { hideLoading, showLoading } from '../../states/loading/action';

vi.mock('../../utils/api', () => ({
  default: {
    createComment: vi.fn(),
    getThreadDetail: vi.fn(),
  },
}));

describe('threadDetail thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('harus dispatch showLoading, addComment, dan hideLoading ketika komentar berhasil dibuat', async () => {
    api.createComment.mockResolvedValue({
      id: 'comment-2',
      content: 'Komentar baru',
      createdAt: '2025-01-01T12:00:00.000Z',
    });

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: {
        id: 'user-1',
        name: 'Lulu',
        avatar: '',
      },
    });

    await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar baru',
    })(dispatch, getState);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, addComment({
      id: 'comment-2',
      content: 'Komentar baru',
      createdAt: '2025-01-01T12:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'Lulu',
        avatar: '',
      },
      upVotesBy: [],
      downVotesBy: [],
    }));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('harus dispatch showLoading, clearThreadDetail, receiveThreadDetail, dan hideLoading ketika detail berhasil diambil', async () => {
    api.getThreadDetail.mockResolvedValue({
      detailThread: {
        id: 'thread-1',
        title: 'Belajar Testing',
        body: '<p>Isi</p>',
        comments: [],
      },
    });

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, clearThreadDetail());
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveThreadDetail({
      id: 'thread-1',
      title: 'Belajar Testing',
      body: '<p>Isi</p>',
      comments: [],
    }));
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoading());
  });
});
