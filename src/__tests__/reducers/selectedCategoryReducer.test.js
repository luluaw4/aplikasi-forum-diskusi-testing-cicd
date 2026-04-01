import { describe, expect, it } from 'vitest';
import selectedCategoryReducer from '../../states/selectedCategory/reducer';
import { ActionType } from '../../states/selectedCategory/action';

describe('selectedCategoryReducer', () => {
  it('harus mengembalikan category yang dipilih ketika menerima action SET_SELECTED_CATEGORY', () => {
    const action = {
      type: ActionType.SET_SELECTED_CATEGORY,
      payload: {
        category: 'redux',
      },
    };

    const nextState = selectedCategoryReducer('all', action);

    expect(nextState).toBe('redux');
  });

  it('harus mengembalikan state sebelumnya ketika menerima action tidak dikenal', () => {
    const nextState = selectedCategoryReducer('testing', { type: 'UNKNOWN_ACTION' });

    expect(nextState).toBe('testing2');
  });
});
