import { initSocket } from 'c/webSocket';

import { ReduxElement } from 'c/lwcRedux';
import { dialerActions, callActions } from 'c/allActions';
import { STATUS } from 'c/dialerConstants';

export default class DialerApp extends ReduxElement  {
    socketInitialized = true;
    init = false;

    mapDispatchToProps() {
        const { initialize, callPauseRecording, callStarRecording, callEnd, saveWebSocket } = dialerActions;
        console.log(dialerActions);

        return { 
            saveWebSocket,
            initialize, 
            callPauseRecording,
            callStarRecording,
            callEnd,
            ...callActions
        };
    }

    mapStateToProps({ uiState, status }) {
        const UserToken = uiState.UserToken;
        return { status, UserToken };
    }

    renderedCallback() {
        console.log('renderedCallback....');
        const token = this.props.UserToken;
        if (token && this.socketInitialized) {
            let webSocket = initSocket(this.props, token);
            this.props.saveWebSocket(webSocket);
            this.socketInitialized = false;
        }

        if (this.init) return;
            this.props.initialize();
            this.init = true;

    }

    get showInitWindow() {
        return  this.props.status === STATUS.SIGN_IN;
    }

    get showMainFunctionality() {
        return this.props.status === STATUS.SIGNED_IN;
    }

    get showCallController() {
        return this.props.status === STATUS.CALL_CONTROLLER;
    }

    get showTransfer() {
        return this.props.status === STATUS.TRANSFER_KEYPAD;
    }
}