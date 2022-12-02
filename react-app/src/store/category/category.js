const LOAD_CATEGORIES = "categories/LOAD_CATEGORIES";

const load = (categories) => {
  return { type: LOAD_CATEGORIES, categories };
};

export const getCategories = () => async (dispatch) => {
  const response = await fetch("http://127.0.0.1:5000/api/categories/");

  if (response.ok) {
    const categories = await response.json();
    dispatch(load(categories.all_categories));
    return categories;
  }
};

const initialState = [];

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      const newState = [];
      for (let i = 0; i < action.categories.length; i++) {
        let category = action.categories[i];
        newState.push(category);
      }
      return newState;
    }
    default:
      return state;
  }
};

export default categoryReducer;
