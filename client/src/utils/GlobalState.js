import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// StoreContext becomes the container to gold our global state data and functionality so we
//can provide it through our app. In other words it instantiates a new Context object
const StoreContext = createContext();
const { Provider } = StoreContext;

//think of storeprovider as our provider component
const StoreProvider = ({ value = [], ...props }) => {
    //instantiate our initial global state with useproductreducer, which wraps the use
    //reducer hook. so we run useproductreducer we get two items in return:
    //current state and dispatch method that looks for an action object passed in as arg.
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: "",
    });

    //use this to confirm it works
    console.log(state);

    //props object allows all childen of storeprovide to access value
    return <Provider value={[state, dispatch]} {...props} />;
};

//hook
const useStoreContext = () => {
    //usecontext is a react hook that allows us to use the global state
    //created from createcontext() provider. In summary, to use the global
    //state variables, we need to use the context's provider and export
    //the same context to the components that will be using the provider.
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
