import { CALL_EVENTS } from 'c/dialerConstants';

const initialState = {
    isPauseResumeDisabled: true,
    isPaused: false
};

const callReducer = (state=initialState, action) => {
    switch (action.type) {
        case CALL_EVENTS.CALL_ORIGINATING_EVENT: {
            const { data } = action.payload;

            return {
                ...state,
                data
            };
        }
        case CALL_EVENTS.CALL_ORIGINATED_EVENT: {
            return {
                ...state,
            };
        }
        case CALL_EVENTS.CALL_COLLECTING_EVENT: {
            return {
                ...state,
            };
        }
        case CALL_EVENTS.CALL_RELEASED_EVENT:
            console.log('reducer CALL_RELEASED_EVENT');
            console.log(JSON.stringify({state}));
            return {
                ...state,
                isPauseResumeDisabled: true,
                isPaused: false
            }
        case CALL_EVENTS.CALL_HELD_EVENT:
            console.log('reducer CALL_HELD_EVENT');
            console.log(JSON.stringify({state}));
            return {
                ...state,
                isPaused: true
            }
        case CALL_EVENTS.CALL_RETRIEVED_EVENT:
            return {
                ...state,
                isPaused: false
            }
        case CALL_EVENTS.CALL_ANSWERED_EVENT:
            return {
                ...state,
                isPauseResumeDisabled: false
            }
        default: return state;
    }
}
export default callReducer;