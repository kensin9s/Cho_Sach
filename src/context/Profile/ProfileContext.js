import createDataContext from '../createDataContext';
import shopApi from '../../api/shopApi';
import {
  EDIT_PROFILE,
  SET_NAV_PROFILEKEY,
  SET_PROFILE,
  SET_ERROR_MESSAGE,
  REQUEST_NETWORK_ERROR,
  NO_PROFILE,
} from './types';
import {Profile} from '../../models/ProfileItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  profile: [],
  userProfile: [],
  profileNavKey: '',
  error: {},
};

const profileReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_PROFILE: {
      return {
        ...state,
        error: {},
        profile: payload.profile,
        userProfile: payload.profile.filter(
          prod => prod.ownerId === payload.userId,
        ),
      };
    }

    case SET_ERROR_MESSAGE: {
      return {...state, error: payload};
    }
    case EDIT_PROFILE: {
      {
        const index = state.profile.findIndex(prod => prod.id === payload.id);
        const updatedProfile = [...state.profile];
        updatedProfile[index] = payload;
        return {
          ...state,
          profile: updatedProfile,
          userProfile: updatedProfile.filter(
            prod => prod.ownerId === payload.ownerId,
          ),
        };
      }
    }


    case SET_NAV_PROFILEKEY: {
      return {...state, proileNavKey: payload};
    }

    default:
      return state;
  }
};


const editProfile = dispatch => async prodData => {
  const profile = new Profile(
    prodData.id,
    prodData.ownerId,
    prodData.title,
    prodData.image,
  );
  try {
    console.log(prodData.price);
    await shopApi.patch(`/profile/${profile.id}.json`, {
      title: prodData.title,
      image: prodData.image,
     });
    dispatch({type: EDIT_PROFILE, payload: profile});
  } catch (err) {
    throw err;
  }
};

const setProfileNavKey = dispatch => key => {
  dispatch({type: SET_NAV_PROFILEKEY, payload: key});
};

const getProfile = dispatch => async userId => {
  try {
    const response = await shopApi.get('/profile.json');
    // console.log('response',response)
    const data = response.data;
    const profile = [];
    for (let key in data) {
      profile.push(
        new Profile(
          key,
          data[key].ownerId,
          data[key].title,
          data[key].image,
        ),
      );
    }
    if (profile.length) {
      dispatch({type: SET_PROFILE, payload: {profile, userId}});
    } else {
      const error = {
        type: NO_PROFILE,
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
  profileReducer,
  initialState,
  {
    editProfile,
    setProfileNavKey,
    getProfile,
  },
);
