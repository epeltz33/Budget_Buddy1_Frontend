import { createSelector } from "reselect";

const categories = (state) => state.category;

export const selectCategoryNameById = createSelector(
  [categories, (state, categoryId) => categoryId],
  (categories, categoryId) => categories[categoryId - 1].category_name
);
