const INITIAL_STATE = {
    email: ""
}

function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADDUSER':{
            return{
                ...state,
                email: action.payload
            }
        }
        case 'REMOVEUSER':{
            return{
                ...state,
                email: action.payload
            }
        }
    }
    return state;


}

export default userReducer;