import {createSelector} from 'reselect';

const getAccount = state => state.account.byId; //  get the account state from the store state

export const getAccountById = createSelector(
    [getAccount, (state, accountId) => accountId], 
    (getAccount, accountId) => getAccount[accountId].account_name //  return the account name
);
