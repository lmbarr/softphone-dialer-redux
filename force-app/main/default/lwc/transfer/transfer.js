import { ReduxElement } from 'c/lwcRedux';
import { dialerActions } from 'c/allActions';

export default class Transfer extends ReduxElement {
    mapDispatchToProps() {
        const { callNew , callTransfer } = dialerActions;
        return { callNew , callTransfer };
    }

    mapStateToProps({ callState }) {
    }

    handleTransfer() {
        this.props.callTransfer();
    }

    handleAttendedTransfer() {
        this.props.callNew();
    }
}