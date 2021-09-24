const defaultState = {
    isAuth: false, 
} 

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "AUTH":
            return {isAuth: action.payload}
        default:
            return state
    }
}