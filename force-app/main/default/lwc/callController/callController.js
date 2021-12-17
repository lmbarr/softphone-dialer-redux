import { ReduxElement } from 'c/lwcRedux';
import { dialerActions } from 'c/allActions';

export default class CallController extends ReduxElement {

    mapDispatchToProps() {
        const { callTalk, callEnd, callHold, callStopRecording, callEndComplete, transfer, callStartConference } = dialerActions;
        return { callTalk, callEnd, callHold, callStopRecording, callEndComplete, transfer, callStartConference };
    }

    mapStateToProps({ callState, uiState }) {
        const { calls } = uiState;
        const [activeCall, ...rest] = calls; 
        const isPaused = callState.isPaused;
        const isPauseResumeDisabled = callState.isPauseResumeDisabled
        return { isPaused, isPauseResumeDisabled, activeCall, rest };
    }

    get dialedNumber() {
        return this.props.activeCall?.dialedNumber;
    }

    get pauseResumeIconName() {
        return this.props.isPaused ? "utility:play" : "utility:pause";
    }

    get isPauseResumeDisabled() {
        return this.props.isPauseResumeDisabled;
    }

    handleCallConference() {
        this.props.callStartConference();
    }

    handleCallTransfer() {
        this.props.transfer();
    }
    
    handleCallTalk() {
        // const outputText = this.template.querySelector('lightning-input').value;
        this.props.callTalk();
    }

    handleCallEnd() {
        this.props.callEndComplete();
    }

    handleCallPauseResume() {
        if (this.props.isPaused) {
            this.props.callTalk();
        } 
        else {
            this.props.callHold();
        }
    }
}