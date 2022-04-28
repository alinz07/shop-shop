import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
} from "../utils/actions";

import { useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object, just with a changed products array
        // in our tests, we imported the reducer function and passed ((the dummy state), (an action object that contained the name of the
        //action like UPDATE_PRODUCTS, a products array))
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter((product) => {
                return product._id !== action._id;
            });
            return {
                ...state,
                cart: newState,
                cartOpen: newState.length > 0,
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                }),
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: [],
                cartOpen: false,
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };
        default:
            return state;
    }
};

//we call useproductreducer in storeprovider component,so in app.js
//when we use this component it will call useproductreducer
//when setting [state and dispatch]. This [state and dispatch] is provided
//to all children in app.js through the value key.
//use reducer is like flipping array arguments of use state. ex:

// const [variable, setVariable] = useState(initialState)

//usereducer() is more like
//[variable, setVariable]=useReducer(setVariable, initial variable)
//where the setvariable is a function (our reducer function) that listens
//for the dispatch method to be called.

//combining the code from globalstatejs it's like:
//const [variable, setvariable] = usereducer(setvariable function def, initialState used in set variable function def)

//in other words/in terms of code below, the usereducer hook needs that
//initialstate argument for the state part of the reducer function.
// the reducer function itself listens for dispatch to be called
//(that code is in app.js where it assign [state, dispatch]) and
//the dispatch method kinda becomes the action portion of the reducer
//and state is already stored by the initialstate arg of usereducer.
//because usereducer sets up this global variable and the dispatch
//method to change it, we can use these [state, dispatch] constants in
//the provider to allow any children of the provider to create the
//new global state via dispatch and access the state variable and therefore it's
//properties as well. in this app the state properties are products,
//categories and current category.

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}
