const LOAD_ACCOUNTS = "account/LOAD_ACCOUNT";
const REMOVE_ACCOUNT = "accounts/REMOVE_ACCOUNT";
const UPDATE_ACCOUNT = "accounts/UPDATE_ACCOUNT";
const ADD_ACCOUNT = "accounts/ADD_ACCOUNT";

const load = (accounts) => {
  return { type: LOAD_ACCOUNTS, accounts };
};

const add = (newAccount) => {
  return { type: ADD_ACCOUNT, newAccount };
};

const remove = (oldAccount) => {
  return { type: REMOVE_ACCOUNT, oldAccount };
};

const update = (account) => {
  return { type: UPDATE_ACCOUNT, account };
};

export const getAccounts = () => async (dispatch) => {
  const response = await fetch("/api/accounts/");

  if (response.ok) {
    const accounts = await response.json();
    dispatch(load(accounts.all_accounts));
    return accounts;
  }
};

export const createAccount = (newAccount) => async (dispatch) => {
  const response = await fetch(`/api/accounts/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAccount),
  });
  const account = await response.json();

  if (response.ok) {
    dispatch(add(account));
    return account;
  }
};

export const deleteAccount = (oldAccount) => async (dispatch) => {
  const response = await fetch(`/api/accounts/${oldAccount.id}`, {
    method: "delete",
  });

  if (response.ok) {
    const account = await response.json();
    dispatch(remove(account));
  }
};

export const updateAccount = (data) => async (dispatch) => {
  const response = await fetch(`/api/accounts/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const account = await response.json();
    dispatch(update(account));
    return account;
  }
};

const initialState = { byId: {}, all: [] };

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS: {
      const newState = {
        ...state,
        byId: {},
        all: [],
      };
      for (let i = 0; i < action.accounts.length; i++) {
        //  loop through the accounts
        let account = action.accounts[i]; //  get the account
        newState.byId[account.id] = account; //  add the account to the byId object
        newState.all.push(account); //  add the account to the all array of accounts
      }
      return newState; //  return the new state
    }

    case ADD_ACCOUNT: {
      const newAccount = action.newAccount;
      const newState = {
        ...state,
        byId: { ...state.byId, [newAccount.id]: newAccount },
        all: [...state.all, newAccount],
      };
      return newState;
    }
    case REMOVE_ACCOUNT: {
      const removeId = action.oldAccount.id;
      const newState = {
        ...state,
        byId: { ...state.byId },
        all: state.all.filter((account) => account.id !== removeId),
      };
      delete newState.byId[removeId];

      return newState;
    }
    case UPDATE_ACCOUNT: {
      const editAccount = action.account;
      const editId = editAccount.id;
      const newState = {
        ...state,
        byId: { ...state.byId, [editId]: editAccount },
        all: state.all.map((account) =>
          account.id === editId ? editAccount : account
        ),
      };

      return newState;
    }
    default:
      return state;
  }
};

export default accountReducer;
