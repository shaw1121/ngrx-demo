import { CartActionTypes, CartActions } from './cart.actions';
import { Action } from '@ngrx/store';


const initialState = {
    addedId: [],
    quatityById: {}
}

export function cartReducer(state = initialState.addedId, action: CartActions) {
    switch(action.type) {
        case CartActionTypes.CHECKOUT_REQUEST:
            return initialState;
        case CartActionTypes.ADD_TO_CART:
            return 
        default: 
            return {
                // addedId: add
            }
    }
}