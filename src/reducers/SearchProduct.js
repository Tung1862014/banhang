// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const searchProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCT': {
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
export default searchProductReducer;
