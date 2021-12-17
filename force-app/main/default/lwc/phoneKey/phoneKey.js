import { api } from 'lwc';
import { ReduxElement } from 'c/lwcRedux';
import { dialerActions } from 'c/allActions';

export default class PhoneKey extends ReduxElement {
    @api title ;
    @api subtitle;

    mapDispatchToProps() {
        const { dialDigit } = dialerActions;
        return { dialDigit };
	}
	
    onKeyClick() {
        this.props.dialDigit({ digit: this.title })
    }
}