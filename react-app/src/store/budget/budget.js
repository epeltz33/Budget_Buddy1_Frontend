const update_budgets = 'budgets/update_budget';
const load_budgets = 'budgets/load_budgets';

const update = (budget) => {
    return { type: update_budgets, budget };
};

const load = (budgets) => {
    return { type: load_budgets, budgets };
}

export const updateBudget = (data) => async (dispatch) => {
    const response = await fetch(`/ap[i/budgets/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const budget = await response.json();
        dispatch(update(budget));
        return budget;
    }
};

export const getBudgets = () => async (dispatch) => {
    const response = await fetch('/api/budgets');
    if (response.ok) {
        const budgets = await response.json();
        dispatch(load(budgets));
        return budgets;
    }
}

const initialState = { byId: {}, allIds: [] }; // this is the default state of the reducer when the app first loads
 