
import {
    GET_STOCK,
    BUY_STOCK,
    SELL_STOCK,
    LIST_STOCKS,
    STOCKS_LOADING
} from '../actions/types';

const initialState = {
    holdingStocks: [],
    queriedStock: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STOCK:
            console.log('Payload', action.payload);
            return {
                ...state,
                queriedStock: action.payload,
                loading: false
            };
        case LIST_STOCKS:
            return {
                ...state,
                holdingStocks: action.payload,
                loading: false
            };
        case BUY_STOCK:
            return {
                ...state,
                holdingStocks: action.paylod
            };
        case SELL_STOCK:
            return {
                ...state,
                holdingStocks: action.payload
            };
        case STOCKS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}