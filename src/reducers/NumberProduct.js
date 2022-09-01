// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const numberProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NUMBER_PRODUCT': {
            const newList = [...state.list];
            newList.push(action.payload);
            return {
                ...state,
                list: newList,
            };
        }
        default:
            return state;
    }
};
export default numberProductReducer;
