import { ReduxElement } from 'c/lwcRedux';
import { dialerActions } from 'c/allActions';


export default class Keypad extends ReduxElement {

    onChangePhoneNumber(event) {
        const dialedNumber = event.target.value;
        this.props.dialNumber({ dialedNumber });
    }

    mapDispatchToProps() {
        const { dialNumber } = dialerActions;
        return { dialNumber };
	}
	
	mapStateToProps({ uiState }) {
		console.log(JSON.stringify(uiState));
		const dialedNumber = uiState.dialedNumber;
        return { dialedNumber };
	}

}