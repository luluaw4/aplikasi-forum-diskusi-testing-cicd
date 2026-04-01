import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreload } from '../../states/isPreload/action';
import { setAuthUser, unsetAuthUser } from '../../states/authUser/action';

vi.mock('../../utils/api', () => ({
  default: {
    getAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

describe('isPreload thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('harus dispatch unsetAuthUser dan setIsPreload(false) ketika access token tidak tersedia', async () => {
    api.getAccessToken.mockReturnValue('');
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, unsetAuthUser());
    expect(dispatch).toHaveBeenNthCalledWith(2, setIsPreload(false));
  });

  it('harus dispatch setAuthUser dan setIsPreload(false) ketika profile berhasil diambil', async () => {
    api.getAccessToken.mockReturnValue('token-123');
    api.getOwnProfile.mockResolvedValue({
      user: {
        id: 'user-1',
        name: 'Lulu',
        email: 'lulu@mail.com',
        avatar: '',
      },
    });
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthUser({
      id: 'user-1',
      name: 'Lulu',
      email: 'lulu@mail.com',
      avatar: '',
    }));
    expect(dispatch).toHaveBeenNthCalledWith(2, setIsPreload(false));
  });
});
