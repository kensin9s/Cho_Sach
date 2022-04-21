import React, {useReducer, useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_IMAGE,
  SET_GENDER,
  SET_DESCRIPTION,

  SET_TITLE_VALIDATION,
  SET_IMAGE_VALIDATION,
  SET_GENDER_VALIDATION,
  SET_DESCRIPTION_VALIDATION,
} from './inputTypes';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import {Context as AuthContext} from '../../context/auth/AuthContext';


const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_TITLE: {
      return {...state, title: {...state.title, value: payload}};
    }
    case SET_IMAGE: {
      return {...state, imageUrl: {...state.imageUrl, value: payload}};
    }
    case SET_GENDER: {
      return {...state, gender: {...state.gender, value: payload}};
    }
    case SET_DESCRIPTION: {
      return {...state, description: {...state.description, value: payload}};
    }
    
    case SET_TITLE_VALIDATION: {
      return {...state, title: {...state.title, isValid: payload}};
    }
    case SET_IMAGE_VALIDATION: {
      return {...state, imageUrl: {...state.imageUrl, isValid: payload}};
    }
    case SET_GENDER_VALIDATION: {
      return {...state, gender: {...state.gender, isValid: payload}};
    }
    case SET_DESCRIPTION_VALIDATION: {
      return {...state, description: {...state.description,isValid: payload}};
    }

    default:
      return state;
  }
};

const ProductForm = ({submitButtonTitle, profile, onSubmit}) => {
  const initialFormState = {
    title: {value: profile?.title, isValid: profile ? true : false},
    imageUrl: {value: profile?.imageUrl, isValid: profile ? true : false},
    gender: {value: profile?.gender, isValid: profile ? true : false},
    description: {value: profile?.description, isValid: profile ? true : false},   
  };

  const [{title, imageUrl,gender,description}, dispatch] = useReducer(
    reducer,
    initialFormState,
  );
  const [formIsValid, setFormIsValid] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();

  const {
    state: {userId},
  } = useContext(AuthContext);

  useEffect(() => {
    if (
      title.value &&
      imageUrl.value &&
      gender.value &&
      description.value &&
      title.isValid &&
      imageUrl.isValid &&
      gender.isValid &&
      description.isValid  
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    title.value,
    imageUrl.value,
    gender.value,
    description.value,
    title.isValid,
    imageUrl.isValid,
    gender.isValid,
    description.isValid,
    formIsValid,
  ]);

  const prodData = profile
    ? {
        id: profile.id,
        ownerId: profile.ownerId,
        title: title.value,
        imageUrl: imageUrl.value,
        gender: gender.value,
        description: description.value,
      }
    : {
        ownerId: userId,
        title: title.value,
        imageUrl: imageUrl.value,
        gender: gender.value,
        description: description.value,
      };

  const formSubmitHandler = async () => {
    setIsSubmitting(true);
    setActionDisabled(true);

    try {
      await onSubmit(prodData);
      navigation.goBack();
    } catch (err) {
      if (!err.response) {
        toggleAlert();
      }
      setActionDisabled(false);
    }

    setIsSubmitting(false);
  };

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  return (
    <View style={styles.form}>
      <LabledInput
        required
        autoCapitalize="sentences"
        value={title.value}
        label="Title"
        onChangeText={newTxt => dispatch({type: SET_TITLE, payload: newTxt})}
        isValid={title.isValid}
        setIsValid={val => dispatch({type: SET_TITLE_VALIDATION, payload: val})}
      />
 
      <LabledInput
        required
        autoCapitalize="none"
        value={imageUrl.value}
        label="Image URL"
        onChangeText={newTxt => dispatch({type: SET_IMAGE, payload: newTxt})}
        isValid={imageUrl.isValid}
        setIsValid={val => dispatch({type: SET_IMAGE_VALIDATION, payload: val})}
      />
        <LabledInput
        required
        autoCapitalize="sentences"
        value={gender.value}
        label="Gender"
        onChangeText={newTxt => dispatch({type: SET_GENDER, payload: newTxt})}
        isValid={gender.isValid}
        setIsValid={val => dispatch({type: SET_GENDER_VALIDATION, payload: val})}
      />
 
      <LabledInput
        required
        autoCapitalize="sentences"
        value={description.value}
        label="Description"
        onChangeText={newTxt => dispatch({type: SET_DESCRIPTION, payload: newTxt})}
        isValid={description.isValid}
        setIsValid={val => dispatch({type: SET_DESCRIPTION_VALIDATION, payload: val})}
      />
 
      <FormSubmitButton
        shallowAppearance={!formIsValid}
        disabled={!formIsValid || actionDisabled}
        title={submitButtonTitle}
        isSubmitting={isSubmitting}
        submitHandler={formSubmitHandler}
      />
      <ErrorModal
        isVisible={alert}
        title="Oops"
        message="Please check your internet connection"
        buttonTitle="Try Again"
        onCancel={() => toggleAlert()}
        Icon={() => (
          <Feather
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.8)`}
          />
        )}
      />
    </View>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
