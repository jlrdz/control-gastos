import { useReducer } from "react";

const actions = {
    UPDATE_VALUE: "UPDATE_VALUE",
    SET: "SET",
};

const updateValue = (id, value) => ({
    type: actions.UPDATE_VALUE,
    payload: { id, value },
});

const set = (payload) => ({
    type: actions.SET,
    payload,
});

function reducer(state, action) {
    switch (action.type) {
        case actions.UPDATE_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.id]: action.payload.value ?? "",
                },
            };
        case actions.SET:
            return {
                values: { ...action.payload.values },
            };
        default:
            return state;
    }
}

export const useForm = (initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function changeValue(e) {
        const { id, name, value } = e.target;
        dispatch(updateValue(id || name, value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(state, null, 2));
    }

    function handleReset() {
        dispatch(set(initialState));
    }

    return {
        state,
        changeValue,
        handleSubmit,
        handleReset,
    };
};
