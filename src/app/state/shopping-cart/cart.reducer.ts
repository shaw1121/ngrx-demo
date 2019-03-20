import { CartActionTypes, CartActions } from './cart.actions';
import { Action } from '@ngrx/store';


const initialState = {
    addedId: [],
    quatityById: {}
}

export function cartReducer(state = initialState.addedId, action: CartActions) {
    switch(action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                ...state,
                product: action.payload
            }
    }
}