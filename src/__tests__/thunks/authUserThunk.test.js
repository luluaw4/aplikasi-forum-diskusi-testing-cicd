import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncRegisterUser,
  asyncSetAuthUser,
  setAuthUser,
} from '../../states/authUser/action';
import { hideLoading, showLoading } from '../../states/loading/action';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
    register: vi.fn(),
  },
}));

describe('auth user thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('harus dispatch showLoading, setAuthUser, dan hideLoading ketika login berhasil', async () => {
    api.login.mockResolvedValue({ accessToken: 'token-123' });
    api.getOwnProfile.mockResolvedValue({
      user: {
        id: 'user-1',
        name: 'Lulu',
        email: 'lulu@mail.com',
        avatar: '',
      },
    });

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'lulu@mail.com',
      password: 'rahasia123',
    })(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith('token-123');
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUser({
      id: 'user-1',
      name: 'Lulu',
      email: 'lulu@mail.com',
      avatar: '',
    }));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('harus memanggil navigate ke halaman login setelah registrasi berhasil', async () => {
    api.register.mockResolvedValue({ id: 'user-2' });

    const dispatch = vi.fn();
    const navigate = vi.fn();

    await asyncRegisterUser({
      name: 'User Baru',
      email: 'baru@mail.com',
      password: 'rahasia123',
      navigate,
    })(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(navigate).toHaveBeenCalledWith('/login');
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
  });
});
