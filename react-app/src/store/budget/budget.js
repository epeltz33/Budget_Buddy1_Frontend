const update_budget = 'budgets/update_budget';
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

const initialState = { byId: {}, all: [] };

const budgetReducer = (state = initialState, action) => {
    switch (action.type) { // this is where the action is handled
        case update_budget: {
            const newState = {
                ...state,
                byId: {
                    ...state.byId,
                
                },
                allIds: [...state.allIds],
            };
            const updateBudget = action.budget; // this is the budget that was updated
            newState.byId[updateBudget.id] = updateBudget; // this is where the budget is updated in the state
            const updateIndex = newState.allIds.findIndex((budget) => budget.id === updateBudget.id);
            newState.allIds[updateIndex] = updateBudget.id;// the budget is updated in the allIds array 
            return newState;
        };
        case load_budgets: { 
            const newState = { byId: {}, allIds: [] };
            action.budgets.forEach((budget) => {
                newState.byId[budget.id] = budget;
                newState.allIds.push(budget.id);
            }
            );
            return newState;
        };
        default:
            return state;
    }
};

export default budgetReducer;

