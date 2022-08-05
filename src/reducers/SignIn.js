// reducers/hobby.js
const initialState = {
    list: [],
    activeId: null,
};
const signinReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN': {
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
export default signinReducer;
