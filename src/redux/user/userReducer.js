const INITIAL_STATE = {
    email: "",
    pseudo: ""
}

function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADDUSER':{
            return{
                ...state,
                email: action.payload.email,
                pseudo: action.payload.pseudo
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