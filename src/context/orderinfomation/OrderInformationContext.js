import createDataContext from '../createDataContext';
import shopApi from '../../api/shopApi';
import {
  CREATE_ORDERIF,
  EDIT_ORDERIF,
  SET_NAV_ORDERIFKEY,
  SET_ORDERIF,
  SET_ERROR_MESSAGE,
  REQUEST_NETWORK_ERROR,
  NO_ORDERIF,
} from './types';
import {OrderInfomation} from '../../models/Orderinformation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  orderif: [],
  userOrderif: [],
  profileNavKey: '',
  error: {},
};

const orderifReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_ORDER: {
      return {
        ...state,
        error: {},
        orderif: payload.orderif,
        userOrderif: payload.orderif.filter(
          prod => prod.ownerId === payload.userId,
        ),
      };
    }

    case SET_ERROR_MESSAGE: {
      return {...state, error: payload};
    }
    case CREATE_ORDERIF: {
      return {
        ...state,
        orderif: [...state.orderif, payload],
        userOrderif: [...state.userOrderif, payload],
      };
    }
    case EDIT_ORDERIF: {
      {
        const index = state.orderif.findIndex(prod => prod.id === payload.id);
        const updatedOrderif = [...state.orderif];
        updatedOrderif[index] = payload;
        return {
          ...state,
          orderif: updatedOrderif,
          userOrderif: updatedOrderif.filter(
            prod => prod.ownerId === payload.ownerId,
          ),
        };
      }
    }


    case SET_NAV_ORDERIFKEY: {
      return {...state, proileNavKey: payload};
    }

    default:
      return state;
  }
};

const createOrderif = dispatch => async prodData => {
  try {
    const response = await shopApi.post('/orderIF.json', {...prodData});
    const orderif = new OrderInfomation(
      response.data.name,
      prodData.ownerId,
      prodData.title,
      prodData.address,
      prodData.phone,
      prodData.description,
      prodData.totalAmount,
    );
    dispatch({type: CREATE_ORDERIF, payload: orderif});
  } catch (err) {
    throw err;
  }
};

const editOrderif = dispatch => async prodData => {
  const orderif = new OrderInfomation(
    prodData.id,
    prodData.ownerId,
    prodData.title,
    prodData.address,
    prodData.phone,
    prodData.description,
    prodData.totalAmount,
  );
  try {
    await shopApi.patch(`/orderIF/${orderif.id}.json`, {
      title: prodData.title,
      address: prodData.address,
      phone: prodData.phone,
      description: prodData.description,
      totalAmount: prodData.totalAmount,
     });
    dispatch({type: EDIT_ORDERIF, payload: orderif});
  } catch (err) {
    throw err;
  }
};

const setOrderifNavKey = dispatch => key => {
  dispatch({type: SET_NAV_ORDERIFKEY, payload: key});
};

const getOrderif = dispatch => async userId => {
  try {
    const response = await shopApi.get('/orderIF.json');
    const data = response.data;
    const orderif = [];
    for (let key in data) {
      orderif.push(
        new OrderInfomation(
          key,
          data[key].ownerId,
          data[key].title,
          data[key].address,
          data[key].phone,
          data[key].description,
          data[key].totalAmount,
        ),
      );
    }
    if (orderif.length) {
    // console.log('profile',profile)
    // console.log('userId',userId)

      dispatch({type: SET_ORDERIF, payload: {orderif, userId}});
    } else {
      const error = {
        type: NO_ORDERIF,
        message: 'No profile were found',
      };
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });
    }
  } catch (err) {
    if (!err.response) {
      const error = {
        type: REQUEST_NETWORK_ERROR,
        message: 'Please check your internet connection.',
      };
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });
    } else {
      console.log(JSON.stringify(err));
    }
  }
};

export const {Context, Provider} = createDataContext(
  orderifReducer,
  initialState,
  {
    createOrderif,
    editOrderif,
    setOrderifNavKey,
    getOrderif,
  },
);
