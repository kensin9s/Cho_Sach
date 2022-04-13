import createDataContext from '../createDataContext';
import shopApi from '../../api/shopApi';
import {
  DELETE_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  SET_CATEGORY,
  SET_NAV_CATEGORIESKEY,
  NO_CATEGORIES,
  SET_ERROR_MESSAGE,
  REQUEST_NETWORK_ERROR,
} from './types';
import {Category} from '../../models/categoriesItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  categories: [],
  userCategories: [],
  categoriesNavKey: '',
  error: {},
};

const categoriesReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_CATEGORY: {
      return {
        ...state,
        error: {},
        categories: payload.categories,
        userCategories: payload.categories.filter(
          prod => prod.ownerId === payload.userId,
        ),
      };
    }

    case SET_ERROR_MESSAGE: {
      return {...state, error: payload};
    }

    case DELETE_CATEGORY: {
      return {
        ...state,
        userCategories: state.userCategories.filter(prod => prod.id !== payload),
        categories: state.càtegories.filter(prod => prod.id !== payload),
      };
    }

    case ADD_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, payload],
        userCategories: [...state.userCategories, payload],
      };
    }

    case EDIT_CATEGORY: {
      {
        const index = state.categories.findIndex(prod => prod.id === payload.id);
        const updatedCategories = [...state.categories];
        updatedCategories[index] = payload;
        return {
          ...state,
          categories: updatedCategories,
          userCategories: updatedCategories.filter(
            prod => prod.ownerId === payload.ownerId,
          ),
        };
      }
    }

    case SET_NAV_CATEGORIESKEY: {
      return {...state, categoriesNavKey: payload};
    }

    default:
      return state;
  }
};

const deleteCategory = dispatch => async prodId => {
  try {
    await shopApi.delete(`/categories/${prodId}.json`);
    dispatch({type: DELETE_CATEGORY, payload: prodId});
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

const addCategory = dispatch => async prodData => {
  try {
    const response = await shopApi.post('/categories.json', {...prodData});
    const category = new Category(
      response.data.name,
      prodData.ownerId,
      prodData.title,
    );
    dispatch({type: ADD_CATEGORY, payload: category});
  } catch (err) {
    throw err;
  }
};

const editCategory = dispatch => async prodData => {
  const category = new Category(
    prodData.id,
    prodData.title,
  );
  try {
    console.log(prodData.price);
    await shopApi.patch(`/categories/${category.id}.json`, {
      title: prodData.title,  
     });
    dispatch({type: EDIT_CATEGORY, payload: category});
  } catch (err) {
    throw err;
  }
};

const setCategoriesNavKey = dispatch => key => {
  dispatch({type: SET_NAV_CATEGORIESKEY, payload: key});
};

const getCategories = dispatch => async userId => {
  try {
    const response = await shopApi.get('/categories.json');
    // console.log('response',response)
    const data = response.data;
    const categories = [];
    for (let key in data) {
      categories.push(
        new Product(
          key,
          data[key].ownerId,
          data[key].title,
        ),
      );
    }
    if (products.length) {
      dispatch({type: SET_CATEGORY, payload: {categories, userId}});
    } else {
      const error = {
        type: NO_CATEGORIES,
        message: 'No products were found',
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
  categoriesReducer,
  initialState,
  {
    deleteCategory,
    addCategory,
    editCategory,
    setCategoriesNavKey,
    getCategories,

  },
);
