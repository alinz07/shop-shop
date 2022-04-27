import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from "./actions";

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
