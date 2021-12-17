import { LightningElement, api } from 'lwc';
import {createStore, combineReducers} from 'c/lwcRedux';
import reducers from 'c/dialerReducers';
import { ReduxElement } from 'c/lwcRedux';

export default class DialerContainer extends ReduxElement {
    @api store;

    initialize() {
        console.log('showMainFunctionality')
        /*const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}
        console.log({persistedState});*/
        const persistedState = {};
        console.log({reducers});
        const combineReducersInstance = combineReducers(reducers);
        console.log('------------------------------');
        this.store = createStore(combineReducersInstance, 
                                 persistedState, 
                                 this.logger);

        /*this.store.subscribe(() => {
            console.log('this is the state ', this.store.getState());
            localStorage.setItem('reduxState', JSON.stringify(this.store.getState()))
        });*/
    }

    /*renderedCallback() {    
        if(this.initi) return;

        this.cti.screenPop({
        type: this.cti.SCREENPOP_TYPE.SOBJECT, 
        params: {recordId: '0011U00001feCAYQA2'}, 
        callback: function(response) {
            console.log('API method call executed successfully! returnValue:', response.returnValue);
        }
        });
        this.initi = true;
    }*/

    logger({ getState }) {
        return next => action => {
            // eslint-disable-next-line no-console
            //console.log('will dispatch', JSON.stringify(action))
            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action)
            // eslint-disable-next-line no-console
            //console.log('state after dispatch', JSON.stringify(getState()));
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue
        }
    }
}