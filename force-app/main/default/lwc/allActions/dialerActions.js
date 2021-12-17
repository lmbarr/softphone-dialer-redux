import { INIT_SUCCESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR, DIAL_NUMBER, CALL_NEW_SUCCESS, CALL_NEW_ERROR,
    CALL_TALK_SUCCESS, CALL_TALK_ERROR, CALL_END_SUCCESS, CALL_END_ERROR, STATUS, CALL_HOLD_SUCCESS, CALL_HOLD_ERROR,
    CALL_PAUSE_RECORDING_SUCCESS, CALL_PAUSE_RECORDING_ERROR, CALL_RESUME_RECORDING_SUCCESS, CALL_RESUME_RECORDING_ERROR,
    CALL_START_RECORDING_ERROR, CALL_START_RECORDING_SUCCESS, CALL_STOP_RECORDING_SUCCESS, CALL_STOP_RECORDING_ERROR,
    CALL_END_COMPLETE_SUCCESS, CALL_END_COMPLETE_ERROR, CALL_TRANSFER_SUCCESS, CALL_TRANSFER_ERROR, SAVE_WEBSOCKET,
    CALL_START_CONFERENCE_SUCCESS, CALL_START_CONFERENCE_ERROR } from 'c/dialerConstants';
import signInApex from '@salesforce/apex/SignIn.signIn';
import * as callouts from "./dialerCallouts";


export const initialize = () => {
    return dispatch => {
        dispatch({
            type: INIT_SUCCESS,
            payload: {
                dialedNumber: ''
            }
        });
        dispatch({ type: STATUS.SIGN_IN });
    }
}

export const transfer = () => {
    return dispatch => {
        dispatch({ type: STATUS.TRANSFER_KEYPAD });
    }
}

export const saveWebSocket = webSocket => {
    return dispatch => {
        dispatch({ type: SAVE_WEBSOCKET, payload: { webSocket } });
    } 
}

export const signIn = ({ usr, pwd}) => {
    console.log({ usr, pwd});
    return dispatch => {
        signInApex({ usr, pwd })
        .then(result => {
            console.log('signIn ', result);
            if (result.status) {
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: { 
                        UserToken: result.UserToken,
                        UserName: result.UserName,
                        UserPassword: result.UserPwd 
                    }
                });
                dispatch({
                    type: STATUS.SIGNED_IN
                });
            }
            else {
                dispatch({
                    type: SIGN_IN_ERROR,
                    payload: { error: result.errorMsg }
                });
                dispatch({ type: STATUS.SIGN_IN });
            }
        })
        .catch(error => {
            dispatch({
                type: SIGN_IN_ERROR,
                payload: { error: error }
            });
            dispatch({ type: STATUS.SIGN_IN });
            console.error(error);
        });
    }

}


export const dialDigit = ({ digit }) => {
    console.log({ digit });
    return (dispatch, getState) => {
        const state = getState();
        console.log(JSON.stringify({state}));
        dispatch({
            type: DIAL_NUMBER,
            payload: { dialedNumber: state.uiState.dialedNumber + digit }
        });
    }
}

export const dialNumber = ({ dialedNumber }) => {
    dialedNumber = dialedNumber.replace(/[^\w\s]/gi, '').replace(/\D/g,'');
    
    return dispatch => {
        dispatch({
            type: DIAL_NUMBER,
            payload: { dialedNumber: dialedNumber }
        });
    }
}

export const callNew = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;
        callouts.callNewCallout(activeCall.dialedNumber, uiState.UserName, uiState.UserPassword, uiState.UserToken)
        .then(r => {
            console.log({r});
            if (r.callId && r.msg === "Success") {
                dispatch({
                    type: CALL_NEW_SUCCESS,
                    payload: { callId: r.callId }
                });
                dispatch({
                    type: STATUS.CALL_CONTROLLER
                });
            }
            else {
                dispatch({
                    type: CALL_NEW_ERROR,
                    payload: { error: 'Non callId available on response' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_NEW_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callTalk = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;
        console.log(JSON.stringify(uiState));
        callouts.callTalkCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_TALK_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_TALK_ERROR,
                    payload: { error: 'call/talk endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_TALK_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callEnd = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;

        callouts.callEndCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_END_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_END_ERROR,
                    payload: { error: 'call/end endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_END_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callHold = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;

        callouts.callHoldCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_HOLD_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_HOLD_ERROR,
                    payload: { error: 'call/hold endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_HOLD_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callStarRecording = () => {
    //uiState.pwd es mejor leerlo del servidor
    console.log('callStarRecording');
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;
        callouts.callStarRecordingCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_START_RECORDING_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_START_RECORDING_ERROR,
                    payload: { error: 'callStarRecording endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_START_RECORDING_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callPauseRecording = () => {
    //uiState.pwd es mejor leerlo del servidor
    console.log('callPauseRecording');
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;
        callouts.callPauseRecordingCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_PAUSE_RECORDING_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_PAUSE_RECORDING_ERROR,
                    payload: { error: 'callPauseRecordingCallout endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_PAUSE_RECORDING_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callResumeRecording = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;

        callouts.callResumeRecordingCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_RESUME_RECORDING_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_RESUME_RECORDING_ERROR,
                    payload: { error: 'callResumeRecordingCallout endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_PAUSE_RECORDING_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callEndComplete = () => {
    console.log('callEndComplete');
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;

        Promise.all([
            callouts.callStopRecordingCallout(uiState.UserToken, 
                activeCall.callId, 
                uiState.UserName, 
                uiState.UserPassword),

            callouts.callEndCallout(uiState.UserToken, 
                activeCall.callId, 
                uiState.UserName, 
                uiState.UserPassword)
        ])
        .then(responses => {
            console.log({responses});
            const [r1, r2] = responses;

            if (r1.msg === "Success" && r2.msg === "Success") {
                dispatch({
                    type: CALL_END_COMPLETE_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_END_COMPLETE_ERROR,
                    payload: { error: 'call/end complete endpoint failed' }
                });
            }
        })
        .catch(errors => {
            console.error(errors);
            dispatch({
                type: CALL_END_COMPLETE_ERROR,
                payload: { error: errors }
            });
        });
    }   
}

export const callStopRecording = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;

        callouts.callStopRecordingCallout(uiState.UserToken, activeCall.callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_STOP_RECORDING_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_STOP_RECORDING_ERROR,
                    payload: { error: 'callResumeRecordingCallout endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_STOP_RECORDING_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}


export const callTransfer = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const [ activeCall, ..._ ] = uiState.calls;
        callouts.callTransferCallout(uiState.UserToken, activeCall.dialedNumber, uiState.calls[1].callId, uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_TRANSFER_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_TRANSFER_ERROR,
                    payload: { error: 'callTransfer endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_TRANSFER_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}

export const callStartConference = () => {
    //uiState.pwd es mejor leerlo del servidor
    return (dispatch, getState) => {
        const { uiState } = getState();
        const callIds = uiState.calls.map(el => el.callId);
        callouts.callStartConferenceCallout(uiState.UserToken, callIds,  uiState.UserName, uiState.UserPassword)
        .then(r => {
            console.log({r});
            if (r.msg === "Success") {
                dispatch({
                    type: CALL_START_CONFERENCE_SUCCESS
                });
            }
            else {
                dispatch({
                    type: CALL_START_CONFERENCE_ERROR,
                    payload: { error: 'callStartConference endpoint failed' }
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: CALL_START_CONFERENCE_ERROR,
                payload: { error: error }
            });
            console.error(error);
        });
    }
}