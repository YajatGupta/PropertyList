import * as actions from './actions'

const initialState = {
    loggedIn: false,
    customerID: "",
    property: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                loggedIn: true,
                customerID:action.id,
            }
        case actions.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                customerID:""
            }
        case actions.ADD_PROPERTY:
            return {
                ...state,
                property: {...action.property}
            }
        default:
            return state;
    }
}

export default reducer;