const ActionType = {
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
};

function setSelectedCategory(category) {
  return {
    type: ActionType.SET_SELECTED_CATEGORY,
    payload: {
      category,
    },
  };
}

export { ActionType, setSelectedCategory };
