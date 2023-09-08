import axios from "axios";
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS
} from "../constants/productConstants";

export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        
        const {data} = await axios.get("/api/v1/products");

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data
        });
    }
    catch(error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}