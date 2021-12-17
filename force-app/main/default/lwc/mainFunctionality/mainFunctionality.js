import { LightningElement } from 'lwc';
import { Redux } from 'c/lwcRedux';
import { dialerActions } from 'c/allActions';
import { WebSocketStates } from 'c/dialerConstants';
import { initSocket } from 'c/webSocket';


export default class MainFunctionality extends Redux(LightningElement) {

    mapDispatchToProps() {
        const { callNew } = dialerActions;
        return { callNew };
    }
    
    mapStateToProps({ uiState }) {
        const { dialedNumber, webSocket } = uiState;
        return { dialedNumber, webSocket };
    }

    get isCallDisabled() {
        return this.props.dialedNumber === '';
    }
    
    navigateToAccountPage(accountId) {
        this.dispatchEvent(new CustomEvent(
            'searchAndScreenPop', 
            {
                detail: { data:  {
                    searchParams: 'string',
                    queryParams: 'string', //Optional 
                    defaultFieldValues: {}, //Optional
                    callType: sforce.opencti.CALL_TYPE.OUTBOUND, 
                    deferred: true, //Optional) 
                    callback: function(response) {
                        if (response.success) {
                           console.log('API method call executed successfully! returnValue:', response.returnValue);
                        } else { 
                           console.error('Something went wrong! Errors:', response.errors);
                        }
                    }
               }
            },
                bubbles: true,
                composed: true,
            }
        ));
    }

    handleCallClick() {
        if (this.props.webSocket.readyState === WebSocketStates.CLOSED) {
            alert('websocket is closed');
            //initSocket(this.props, token);
        }
        this.props.callNew();
    }
}