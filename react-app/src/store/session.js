// constants for action types (action types are strings)  and action creators (functions that return an action)
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

// reducer
const initialState = {
    user: null, // this is the user object from the backend (APP: User model)
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}



export const login = (email, password) => async (dispatch) => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
   if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else { // server error
        return ["An error occurred. Please try again."]
    }
};


export const logout = () => async (dispatch) => {
    const res = await fetch("/api/auth/logout", {
        method: "DELETE",
    });
    dispatch(removeUser());
    return res;
}

export const signUp = (username, email, password) => async (dispatch) => {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else { // server error
        return ["An error occurred. Please try again."]
    }
}


 