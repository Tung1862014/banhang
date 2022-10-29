// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const sidebarSellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIDEBAR_SELLER': {
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
export default sidebarSellerReducer;
