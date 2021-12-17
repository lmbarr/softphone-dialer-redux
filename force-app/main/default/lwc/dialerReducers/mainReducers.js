import { INIT_SUCCESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, DIAL_NUMBER, CALL_TALK_SUCCESS,
    CALL_NEW_SUCCESS, CALL_NEW_ERROR, CALL_HOLD_SUCCESS, CALL_PAUSE_RECORDING_SUCCESS, CALL_RESUME_RECORDING_SUCCESS,
    SAVE_WEBSOCKET, STATUS } from 'c/dialerConstants';

/*const socketReducer = (socketState, action) => {
    console.log('reducer counter was called...',action)
    return socketState;
}*/

const initialState = {
    calls: [],
    error: null
};

const uiReducer = (state=initialState, action) => {
    switch (action.type) {
        case INIT_SUCCESS: 
            return {
                ...state            
            };
        
        case SIGN_IN_SUCCESS: 
            const { UserToken, UserName, UserPassword } = action.payload;
            return {
                ...state,
                error: null,
                UserToken,
                UserName,
                UserPassword,
                calls: [{}, ...state.calls]
            };

        case STATUS.TRANSFER_KEYPAD:
            return {
                ...state,
                calls: [{}, ...state.calls]
            };

        case SAVE_WEBSOCKET: 
            const { webSocket } = action.payload;
            return {
                ...state,
                webSocket
            };
        
        case SIGN_IN_ERROR:
            const { error } = action.payload;
            return {
                ...state,
                error
            };
        case DIAL_NUMBER: {
            const { dialedNumber } = action.payload;
            const [ activeCall, ...rest ] = state.calls;
            return {
                ...state,
                calls: [{...activeCall, dialedNumber}, ...rest]
            }; 
        }
        case CALL_NEW_SUCCESS: {
            const { callId } = action.payload;
            const [ activeCall, ...rest ] = state.calls;

            return {
                ...state,
                calls: [{...activeCall, callId}, ...rest]
            };     
        }
        case CALL_NEW_ERROR:
            const { errorC } = action.payload;
            return {
                ...state,
                error: errorC
            };   

        case CALL_TALK_SUCCESS:
            return {
                ...state
            };

        case CALL_HOLD_SUCCESS:
            return {
                ...state
            };       

        case CALL_PAUSE_RECORDING_SUCCESS:
            return {
                ...state
            };   
            
        case CALL_RESUME_RECORDING_SUCCESS:
            return {
                ...state
            };  

        default: return state;
    }
}
export default uiReducer;

/*export default {
    //socketState: socketReducer,
    uiState: uiReducer
}*/