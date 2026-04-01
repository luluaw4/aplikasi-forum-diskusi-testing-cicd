import { describe, expect, it } from 'vitest';
import authUserReducer from '../../states/authUser/reducer';
import { ActionType } from '../../states/authUser/action';

const authUser = {
  id: 'user-1',
  name: 'Lulu',
  email: 'lulu@mail.com',
  avatar: '',
};

describe('authUserReducer', () => {
  it('harus mengembalikan auth user ketika menerima action SET_AUTH_USER', () => {
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    const nextState = authUserReducer(null, action);

    expect(nextState).toEqual(authUser);
  });

  it('harus mengembalikan null ketika menerima action UNSET_AUTH_USER', () => {
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(authUser, action);

    expect(nextState).toBeNull();
  });
});
