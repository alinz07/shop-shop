import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";

function CategoryMenu() {
    //when we usestorecontext, we receive the [state, dispatch] data our Storeprovider manages. this and any other
    //component that have access to storeprovider(all because we wrapped all in it) can use any data in global state or update
    //it using the dispatch function.
    const [state, dispatch] = useStoreContext();
    const { categories } = state;

    const { data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        //once the asynchronous usequery gets us category data, then run dispatch() to update state
        if (categoryData) {
            //execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
        }
        //If there are multiple items in the array, React will re-run the effect even if just one of them is different.
    }, [categoryData, dispatch]);

    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
        });
    };

    return (
        <div>
            <h2>Choose a Category:</h2>
            {categories.map((item) => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryMenu;
