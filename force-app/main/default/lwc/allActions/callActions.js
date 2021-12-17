import { CALL_EVENTS, STATUS } from 'c/dialerConstants';

export const callOriginating = data => {   
    console.log('callOriginating action');
    console.log({data});
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_ORIGINATING_EVENT,
            payload: { data }
        });
    }
}

export const callOriginated = data => {
    console.log('callOriginated action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_ORIGINATED_EVENT,
            payload: { data }
        });
    }
}

export const callCollecting = data => {
    console.log('callCollecting action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_COLLECTING_EVENT,
            payload: { data }
        });
    }
}

export const callReceived = data => {
    console.log('callReceived action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_RECEIVED_EVENT,
            payload: { data }
        });
    }
}

export const callAnswered = data => {
    console.log('callAnswered action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_ANSWERED_EVENT,
            payload: { data }
        });
    }
}

export const callReleased = data => {
    console.log('callReleased action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_RELEASED_EVENT,
            payload: { data }
        });
        dispatch({
            type: STATUS.SIGNED_IN
        });
    }
}

export const callHeld = (data) => {
    console.log('callHeld action');

    console.log({data});

    //uiState.pwd es mejor leerlo del servidor
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_HELD_EVENT,
            payload: { data }
        });
    }
}

export const callRetrieved = data => {
    return dispatch => {
        dispatch({
            type: CALL_EVENTS.CALL_RETRIEVED_EVENT,
            payload: { data }
        });
    }
}