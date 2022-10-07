// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const detailProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DETAIL_PRODUCT': {
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
export default detailProductReducer;
