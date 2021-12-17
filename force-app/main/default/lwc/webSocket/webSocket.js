import { CALL_EVENTS } from 'c/dialerConstants';

export const initSocket = (props, token) => {
    console.log('initSocket.....');
    const socketURL = ''
    let socket = new WebSocket(socketURL + token);

    socket.onopen = function(e) {
        console.log('onopen', e);
        console.log(JSON.stringify({e}));
        //alert("[open] Conexión establecida");
        //alert("Enviando al servidor");
    };
        
       
    socket.onclose = function(event) {
        if (event.wasClean) {
            //alert(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
        } else {
            // ej. El proceso del servidor se detuvo o la red está caída
            // event.code es usualmente 1006 en este caso
            //alert('[close] La conexión se cayó');
        }
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('onmessage websocket ... ')
        console.log(data);
        switch (data.eventType)
        {
            case CALL_EVENTS.CALL_ORIGINATING_EVENT:
                props.callOriginating(data);
                break;
        
            case CALL_EVENTS.CALL_ORIGINATED_EVENT:
                props.callOriginated(data);
                break;
        
            case CALL_EVENTS.CALL_COLLECTING_EVENT:
                props.callCollecting(data);
                break;
        
            case CALL_EVENTS.CALL_RECEIVED_EVENT:
                props.callReceived(data);
                break;
                
            case CALL_EVENTS.CALL_ANSWERED_EVENT:
                props.callAnswered(data);
                props.callStarRecording();
                break;

            case CALL_EVENTS.CALL_HELD_EVENT:
                console.log('case CALL_EVENTS.CALL_HELD_EVENT: dialer app');
                props.callHeld(data);
                props.callPauseRecording();
                break;
            
            case CALL_EVENTS.CALL_RETRIEVED_EVENT:
                console.log('case CALL_EVENTS.CALL_RETRIEVED_EVENT: dialer app');
                props.callRetrieved(data);
                break;                        

            case CALL_EVENTS.CALL_RELEASED_EVENT:// || CALL_EVENTS.CALL_REDIRECTED_EVENT:
                props.callReleased(data);
                break;
            
            case CALL_EVENTS.CALL_RECORDING_STOPPED_EVENT:
                break;

            case CALL_EVENTS.CALL_REDIRECTED_EVENT:
                console.log('CALL_EVENTS.CALL_REDIRECTED_EVENT');
                //props.callEnd();
                break;
        }                
    }
        
    socket.onerror = function(error) {
        console.error(error);
        //alert(`[error] ${error.message}`);
    };
    return socket;
}