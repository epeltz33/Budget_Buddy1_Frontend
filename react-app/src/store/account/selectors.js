import { createSelector } from "reselect";

const accounts = (state) => state.account.byId;

export const selectAccountNameById = createSelector(
  [accounts, (state, accountId) => accountId],
  (accounts, accountId) => accounts[accountId].account_name
);
