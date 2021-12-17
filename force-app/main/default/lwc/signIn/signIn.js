import { ReduxElement } from 'c/lwcRedux';
//import { signIn, mainFunctionality } from 'c/allActions';
import { dialerActions, callActions } from 'c/allActions';


export default class SignIn extends ReduxElement {
	logo = 'https://via.placeholder.com/468x60';
	
	mapDispatchToProps() {
		const { signIn, mainFunctionality } = dialerActions;
        return { signIn, mainFunctionality };
	}
	
	mapStateToProps({ uiState }) {
		console.log(JSON.stringify(uiState));
		const error = uiState.error;
		const isSSO = uiState.isSSO;
        return { error, isSSO };
	}
	
	get isSSOLoggin() {
		return this.props?.isSSO;
	}

    onClickSignIn(username, pswrd) {
		const usr = this.template.querySelector('[data-id="input-usr"]').value;
		const pwd = this.template.querySelector('[data-id="input-password"]').value;
		console.log(username, pswrd);
		this.props.signIn({ usr, pwd });	
	}
}