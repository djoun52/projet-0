const INITIAL_STATE = {
    id: 0,
    email: "",
    pseudo: "",
    statue: false
}

function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADDUSER':{
            return{
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                pseudo: action.payload.pseudo,
                statue : true
            }
        }
        case 'REMOVEUSER':{
            return{
                ...state,
                id: action.payload,
                email: action.payload,
                pseudo: action.payload,
                statue: false
            }
        }
    }
    return state;


}

export default userReducer;