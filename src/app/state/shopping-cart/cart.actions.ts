import { Product } from '../../models/product';
import { Action } from '@ngrx/store';

export enum CartActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    CHECKOUT_REQUEST = 'CHECKOUT_REQUEST',
    CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS',
    CHECKOUT_FAILURE = 'CHECKOUT_FAILURE',
    RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
}

export class AddToCart implements Action {
    readonly type = CartActionTypes.ADD_TO_CART;

    constructor(public payload: { product: Product}) { }
}

export class CheckoutRequest implements Action {
    readonly type = CartActionTypes.CHECKOUT_REQUEST;

    constructor(public payload: { product: Product}) { }
}

export class ReceiveProducts implements Action {
    readonly type = CartActionTypes.RECEIVE_PRODUCTS;
    constructor(public payload: { product: Product}) { }
}

export class CheckoutSuccess implements Action {
    readonly type = CartActionTypes.CHECKOUT_SUCCESS;
    constructor(public payload: { product: Product}) { }
}

export class CheckoutFailure implements Action {
    readonly type = CartActionTypes.CHECKOUT_FAILURE;
    constructor(public payload: { product: Product}) { }
}

export type CartActions = AddToCart | CheckoutRequest | ReceiveProducts | CheckoutSuccess | CheckoutFailure;