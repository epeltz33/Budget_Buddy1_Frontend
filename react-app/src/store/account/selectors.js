import {createSelector} from 'reselect'; //  create a selector function to get the account state


const getAccount = state => state.account.byId; //  get the account state from the store state

export const getAccountById = createSelector(
    [getAccount, (state, accountId) => accountId], //  get the account state and the account id from the store state
    (getAccount, accountId) => getAccount[accountId].account_name //  return the account name
);
