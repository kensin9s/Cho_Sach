import createDataContext from '../createDataContext';
import shopApi from '../../api/shopApi';
import {
  DELETE_ADDRESS,
  ADD_ADDRESS,
  EDIT_ADDRESS,
  SET_NAV_ADDRESSKEY,
  SET_ADDRESS,
  SET_ERROR_MESSAGE,
  NO_ADDRESS,
  REQUEST_NETWORK_ERROR,

} from './types';
import {Address} from '../../models/AddressIF';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  address: [],
  userAddress: [],
  favorites: [],
  addressNavKey: '',
  error: {},
};

const addressReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_ADDRESS: {
      return {
        ...state,
        error: {},
        address: payload.address,
        userAddress: payload.address.filter(
          prod => prod.ownerId === payload.userId,
        ),
      };
    }

    case SET_ERROR_MESSAGE: {
      return {...state, error: payload};
    }

    case DELETE_ADDRESS: {
      return {
        ...state,
        userAddress: state.userAddress.filter(prod => prod.id !== payload),
        address: state.address.filter(prod => prod.id !== payload),
      };
    }

    case ADD_ADDRESS: {
      return {
        ...state,
        address: [...state.address, payload],
        userAddress: [...state.userAddress, payload],
      };
    }

    case EDIT_ADDRESS: {
      {
        const index = state.address.findIndex(prod => prod.id === payload.id);
        const updatedAddress = [...state.address];
        updatedAddress[index] = payload;
        return {
          ...state,
          address: updatedAddress,
          userAddress: updatedAddress.filter(
            prod => prod.ownerId === payload.ownerId,
          ),
        };
      }
    }


    case SET_NAV_ADDRESSKEY: {
      return {...state, addressNavKey: payload};
    }

    default:
      return state;
  }
};

const deleteAddress = dispatch => async prodId => {
  try {
    await shopApi.delete(`/address/${prodId}.json`);
    dispatch({type: DELETE_ADDRESS, payload: prodId});
  } catch (err) {
    if (!err.response) {
      const error = {
        type: REQUEST_NETWORK_ERROR,
        message: 'Please check your internet connection',
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

const addAddress = dispatch => async prodData => {
  try {
    const response = await shopApi.post('/address.json', {...prodData});
    const address = new Address(
      response.data.name,
      prodData.ownerId,
      prodData.title,
      prodData.description,
      prodData.price,
    );
    dispatch({type: ADD_ADDRESS, payload: address});
  } catch (err) {
    throw err;
  }
};

const editAddress = dispatch => async prodData => {
  const address = new Address(
    prodData.id,
    prodData.ownerId,
    prodData.title,
    prodData.description,
    prodData.price,
  );
  try {
    console.log(prodData.price);
    await shopApi.patch(`/address/${address.id}.json`, {
      title: prodData.title, 
      price: prodData.price,
      description: prodData.description,
     
     });
    dispatch({type: EDIT_ADDRESS, payload: address});
  } catch (err) {
    throw err;
  }
};

const setAddressNavKey = dispatch => key => {
  dispatch({type: SET_NAV_ADDRESSKEY, payload: key});
};

const getAddress = dispatch => async userId => {
  try {
    const response = await shopApi.get('/address.json');
    console.log('address',response)
    const data = response.data;
    const address = [];
    for (let key in data) {
      address.push(
        new Address(
          key,
          data[key].ownerId,
          data[key].title,
          data[key].description,
          data[key].price,
        ),
      );
    }
    if (address.length) {
      dispatch({type: SET_ADDRESS, payload: {address, userId}});
    } else {
      const error = {
        type: NO_ADDRESS,
        message: 'No address were found',
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
  addressReducer,
  initialState,
  {
    deleteAddress,
    addAddress,
    editAddress,
    setAddressNavKey,
    getAddress,
  },
);
