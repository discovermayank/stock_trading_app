import axios from 'axios';
import {
    GET_STOCK,
    BUY_STOCK,
    SELL_STOCK,
    LIST_STOCKS,
    STOCKS_LOADING
} from './types';

const key = 'F41ON15LGCFM4PR7';

export const getStock = (symbol) => dispatch => {
    dispatch(setStocksLoading()); 
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`;
    axios.get(url)
    .then(res => {
        dispatch({
            type: GET_STOCK,
            paylod: res.data
        })
    })
};

export const buyStock = (stock) => dispatch => {
    axios
    .post('/api/stocks', stock)
    .then(res => 
        dispatch({
            type: BUY_STOCK,
            paylod: res.data
        })
    )
    //listStocks();
};

export const sellStock = (stock) => dispatch => {
    axios
    .put('/api/stocks', stock)
    .then(res => 
        dispatch({
            type: SELL_STOCK,
            paylod: res.data
        })
    )
};

export const listStocks = () => dispatch => {
    dispatch(setStocksLoading());
    axios
        .get('/api/stocks')
        .then(res => 
            dispatch({
                type: LIST_STOCKS,
                payload: res.data
        })
    );
};

export const setStocksLoading = () => {
    return {
        type: STOCKS_LOADING
    };
};