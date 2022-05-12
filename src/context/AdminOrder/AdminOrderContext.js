import shopApi from '../../api/shopApi';
import {AdminOrder} from '../../models/AdminOrder';
import createDataContext from '../createDataContext';
import {ADD_ADMINORDER, SET_ADMINORDER} from './types';

const intialState = {
  adminorders: [],
};

const adminOrdersReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_ADMINORDER: {
      return {...state, adminorders: payload};
    }

    case ADD_ADMINORDER: {
      return {adminorders: [...state.adminorders, payload]};
    }

    default:
      return state;
  }
};

const addAdminOrder = dispatch => async (cartItems, totalAmount, userId) => {
  const date = new Date();
  try {
    console.log(userId);
    const response = await shopApi.post(`/adminorders/${userId}.json`, {
      cartItems,
      totalAmount,
      date: date.toISOString(),
    });
    const id = response.data.name;
    const adminOrderItem = new AdminOrder(id, cartItems, totalAmount, new Date(date));
    dispatch({type: ADD_ADMINORDER, payload: adminOrderItem});
  } catch (err) {
    throw err;
  }
};

const getAdminOrders = dispatch => async userId => {
  try {
    const response = await shopApi.get(`/adminorders/${userId}.json`);
    const adminorders = [];
    for (let key in response.data) {
      adminorders.push(
        new AdminOrder(
          key,
          response.data[key].cartItems,
          response.data[key].totalAmount,
          response.data[key].date,
        ),
      );
    }
    dispatch({type: SET_ADMINORDER, payload: adminorders});
  } catch (err) {
    throw err;
  }
};

export const {Context, Provider} = createDataContext(
  adminOrdersReducer,
  intialState,
  {addAdminOrder, getAdminOrders},
);
