const INITIAL_STATE = {
    message: '',
    statue: false,
}

function messageReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADDMESSAGE': {
            return {
                ...state,
                message: action.payload,
                statue: true
            }
        }
        case 'REMOVEMESSAGE': {
            return {
                ...state,
                message: '',
                statue: false
            }
        }
    }
    return state;


}

export default messageReducer;