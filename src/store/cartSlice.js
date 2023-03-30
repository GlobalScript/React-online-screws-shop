import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { URL_API } from '../config';
import axios from "axios";
import Cookies from 'js-cookie';

export const addFirstThunk = createAsyncThunk('/cart/addFirstThunk', (product_id, {dispatch, getState})=>{
            const {countGoods} = getState();
                if(!Cookies.get('agree')) dispatch(setCookieAgree());
                if((!Object.keys(countGoods.count).length) && !Cookies.get('cart_id')){
                        const data = {
                            user_buy: false,
                            cart: JSON.stringify({count:{[product_id]: 1}, active:{[product_id]: true}})
                        }
                        const response = axios.post(URL_API + '/add-first-cart', data, { withCredentials: true })
                                    .then(({data})=>{
                                        Cookies.set('cart_id', data.id, { expires: 5, secure: true, sameSite: 'none' });
                                        return {data: data.cart, product_id};
                                    })
                                    .catch((e)=>{
                                        console.log(e.message);
                                        return {}
                                    })
                                        return response;
                }
            dispatch(addNextThunk(product_id));
        }
);

export const addNextThunk = createAsyncThunk('/cart/addNextThunk', (product_id, {getState})=> {
            if(Cookies.get('cart_id')){
                const {countGoods} = getState();
                const cart_count = {};
                const cart_active = {};
                    if(countGoods.count[product_id] === undefined){
                        cart_count[product_id] = 1;
                        cart_active[product_id] = true;
                    } 
                    else {
                        cart_count[product_id] = countGoods.count[product_id] + 1;
                    }
                    const data = {
                        user_buy: false,
                        cart_id: Cookies.get('cart_id'),
                        cart: JSON.stringify(
                            {
                                count: {...countGoods.count, ...cart_count},
                                active: {...countGoods.active, ...cart_active}
                            }),
                    }
            const response = axios.put(URL_API + '/add-cart', data,
                            )
                            .then(({data})=>{
                                return {data, product_id};
                            })
                            .catch((e)=>{
                                console.log(e.message);
                                return {}
                            })
                            return response;
                    }
                    return {};
            }
);

export const inputValueThunk = createAsyncThunk('/cart/inputValueThunk', ({product_id, inpVal}, {getState})=>{
            if(Cookies.get('cart_id')){
                const {countGoods} = getState();
                const cart_count = {};
                const cart_active = {};
                if(!inpVal){
                    cart_count[product_id] = 1;
                }
                else cart_count[product_id] = inpVal;
                    const data = {
                        user_buy: false,
                        cart_id: Cookies.get('cart_id'),
                        cart: JSON.stringify(
                            {
                                count: {...countGoods.count, ...cart_count},
                                active: {...countGoods.active, ...cart_active}
                            }),
                    }
                   
    const response = axios.put(URL_API + '/add-cart', data)
                    .then(({data})=>{
                        return {data, product_id};
                    })
                    .catch((e)=>{
                        console.log(e.message);
                        return {}
                    })
                    return response;
            }
            return {};
    }
);

export const deductThunk = createAsyncThunk('/cart/deductThunk', (product_id, {dispatch, getState})=>{
            if(Cookies.get('cart_id')){
                const {countGoods} = getState();
                const cart_count = {...countGoods.count};
                const cart_active = {...countGoods.active};
                let delete_articul;
                if(countGoods.count[product_id] > 0){
                    cart_count[product_id] = countGoods.count[product_id] - 1;
                } 
                if(cart_count[product_id] === 0) {
                delete cart_count[product_id];
                delete cart_active[product_id];
                delete_articul = product_id;
                }
                    const data = {
                        user_buy: false,
                        cart_id: Cookies.get('cart_id'),
                        cart: JSON.stringify(
                            {
                                count: {...cart_count},
                                active: {...cart_active}
                            }),
                    }
            const response = axios.put(URL_API + '/add-cart', data
                            )
                            .then(({data})=>{
                                return {data, delete_articul};
                            })
                            .catch((e)=>{
                                console.log(e.message);
                                return {}
                            })
                            return response;
                    }
                    return {};
            }
);

export  const removeProductThunk = createAsyncThunk('/cart/removeProductThunk', (product_id, {dispatch, getState})=>{
            if(Cookies.get('cart_id')){
                const {countGoods} = getState();
                const cart_count = {...countGoods.count};
                const cart_active = {...countGoods.active};
                let delete_articul;
                delete cart_count[product_id];
                delete cart_active[product_id];
                delete_articul = product_id;
                const data = {
                        user_buy: false,
                        cart_id: Cookies.get('cart_id'),
                        cart: JSON.stringify(
                            {
                                count: {...cart_count},
                                active: {...cart_active}
                            }),
                }
            const response = axios.put(URL_API + '/add-cart', data)
                            .then(({data})=>{
                                return {data, delete_articul};
                            })
                            .catch((e)=>{
                                console.log(e.message);
                                return {}
                            })
                            return response;
                    }
                    return {};
            }
);

export const getCartThunk = createAsyncThunk('/cart/getCartThunk', ()=>{
    
            if(Cookies.get('cart_id')){
                const response = axios.get(URL_API + '/get-cart/' + Cookies.get('cart_id')) 
                            .then(({data})=>{
                                if(!data) Cookies.remove('cart_id');
                                return {data};
                            })
                            .catch((e)=>{
                                console.log(e.message);
                                return {}
                            })
                                return response;
                }
                return {};
        }
);

export const removeEmptyProductThunk = createAsyncThunk('/cart/removeEmptyProductThunk', (_,{getState})=>{
                const {countGoods} = getState();
                const {dataGoods} = getState();
                const reindexGoods = dataGoods.goods.reduce((previous, item) => {
                    previous[item.id] = item;
                    return previous;
                },{});
                const result = {count:{}, active:{}, reindexGoods};
                Object.keys(countGoods.preCount).map(item => {
                        if(reindexGoods[item]) {
                            result.count[item] = countGoods.preCount[item];
                            result.active[item] = countGoods.preActive[item];
                        }
                    })
                    return result;
});

export const orderThunk = createAsyncThunk('/cart/orderThunk', (order_form, {getState})=>{
            if(Cookies.get('cart_id')){
                const {countGoods} = getState(); 
                const {first_name, last_name, phone_number} = order_form;
                const data = {
                        first_name,
                        last_name,
                        phone_number,
                        user_buy: 'custom',
                        cart_id: Cookies.get('cart_id'),
                        cart: JSON.stringify(
                            {
                                count: {...countGoods.count},
                                active: {...countGoods.active}
                            }),
                    }
    const response = axios.put(URL_API + '/add-cart', data)
                    .then(({data})=>{
                        Cookies.remove('cart_id')
                        return {data};
                    })
                    .catch((e)=>{
                        console.log(e.message);
                        return {}
                    })
                    return response;
            }
            return {};
    }
);

export const cookieAgree = createAsyncThunk('/cart/cookieAgree', ()=>{
            Cookies.set('agree', 'ok', {secure: true, sameSite: 'none'});
                return true;
        
    }
);

export const countSlice = createSlice({
    name: 'count_value',
    initialState:{
        preCount: {},
        preActive: {},
        count: {},
        active: {},
        subPrice: {},
        totalPrice: 0,
        statusCart: false,
        orderNumber: "",
        statusOrder: false,
        reindexGoods: [],
        statusAgree: false
    },
    reducers:{
        sumAllGoods:(state, action) => {
           const units = action.payload
            Object.keys(state.count).map(item => state.subPrice[item] = state.count[item] * units[item]);
            Object.keys(state.subPrice).reduce((previous, item) => {
                 previous += state.subPrice[item];
                 return state.totalPrice = previous;
                }, 0);
          },
        setCookieAgree: (state, action) => {
                state.statusAgree = true;
          },
        setTotalPrice: (state, action) => {
                state.totalPrice = 0;
          }
    },
    extraReducers: {
        [addFirstThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [addNextThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [inputValueThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [deductThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [removeProductThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [getCartThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [removeEmptyProductThunk.pending]: (state) => {
            state.statusCart = false;
        },
        [orderThunk.pending]: (state) => {
            state.statusOrder = false;
        },
        [cookieAgree.pending]: (state) => {
            state.statusAgree = true;
        },
        [addFirstThunk.fulfilled]: (state, action) => {
            if(action.payload){
                const cart = JSON.parse(action.payload.data);
                state.count = cart.count; 
                state.active = cart.active;
                state.statusCart = true;
            }
        },
        [addNextThunk.fulfilled]: (state, action) => {
            if(action.payload.data){
                const cart = JSON.parse(action.payload.data.cart);
                state.count = cart.count; 
                state.active = cart.active;
                state.statusCart = true;
            }
        },
        [inputValueThunk.fulfilled]: (state, action) => {
            if(Object.keys(action.payload).length){
                const cart = JSON.parse(action.payload.data.cart);
                state.count = cart.count; 
                state.active = cart.active;
                state.statusCart = true;
            }
        },
        [deductThunk.fulfilled]: (state, action) => {
            if(Object.keys(action.payload).length){
                const cart = JSON.parse(action.payload.data.cart);
                state.count = cart.count; 
                state.active = cart.active;
                if(Object.keys(state.count).length){
                    Object.keys(state.count).map(()=> {
                        delete state.subPrice[action.payload.delete_articul]
                    });
                }
                else {
                    state.subPrice = {}
                } 
                state.statusCart = true;
             }
        },
        [removeProductThunk.fulfilled]: (state, action) => {
            if(Object.keys(action.payload).length){
                const cart = JSON.parse(action.payload.data.cart);
                state.count = cart.count; 
                state.active = cart.active;
                if(Object.keys(state.count).length){
                    Object.keys(state.count).map(()=> {
                        delete state.subPrice[action.payload.delete_articul]
                    });
                }
                else {
                    state.subPrice = {}
                } 
                state.statusCart = true;
             }
        },
        [getCartThunk.fulfilled]: (state, action) => {
            if(action.payload.data){
                const cart = JSON.parse(action.payload.data.cart);
                state.preCount = cart.count; 
                state.preActive = cart.active;
                state.statusCart = true;
            }
        },
        [removeEmptyProductThunk.fulfilled]: (state, action) => {
            if(Object.keys(action.payload).length){
                state.count = action.payload.count;
                state.active = action.payload.active;
                state.reindexGoods = action.payload.reindexGoods;
                state.statusCart = true;
            }
        },
        [orderThunk.fulfilled]: (state, action) => {
            if(action.payload.data){
                const num = action.payload.data.phone_number
                state.orderNumber = num.match(/\d{9}/g);
                state.count = {};
                state.active = {};
                state.subPrice = {};
                state.totalPrice = 0;
                state.statusOrder = true;
            }
        },
        [cookieAgree.fulfilled]: (state, action) => {
                state.statusAgree = false;
           
        }
    } 
});
export const {sumAllGoods, setCookieAgree, setTotalPrice} = countSlice.actions;
export const countState = state => state.countGoods;
export default countSlice.reducer;