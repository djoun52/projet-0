const INITIAL_STATE = {
    id: 0,
    email: "",
    pseudo: ""
}

function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADDUSER':{
            return{
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                pseudo: action.payload.pseudo,
            }
        }
        case 'REMOVEUSER':{
            return{
                ...state,
                id: action.payload,
                email: action.payload,
                pseudo: action.payload
            }
        }
    }
    return state;


}

export default userReducer;