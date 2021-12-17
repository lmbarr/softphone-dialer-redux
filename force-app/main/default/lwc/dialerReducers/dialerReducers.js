import uiReducer from "./mainReducers";
import callReducer from "./callReducers";
import { INIT_SUCCESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, 
    CALL_NEW_SUCCESS, CALL_EVENTS, STATUS } from 'c/dialerConstants';

const status = (state=null, action) => {
    // it is done in this way because not all actions are required
    // replace this action types with new ones because they are being use on another reducer
    console.log('status reducer///');
    console.log(JSON.stringify({state}));
    console.log(JSON.stringify({action}));

    switch (action.type) {
        case STATUS.SIGN_IN: return STATUS.SIGN_IN;
        
        case STATUS.SIGNED_IN: return STATUS.SIGNED_IN;

        case STATUS.CALL_CONTROLLER: return STATUS.CALL_CONTROLLER;

        case STATUS.TRANSFER_KEYPAD: return STATUS.TRANSFER_KEYPAD;
            
        default: return state;
    }
}

export default {
    uiState: uiReducer,
    callState: callReducer,
    status
}