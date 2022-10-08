// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const cartProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_PRODUCT': {
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
export default cartProductReducer;
