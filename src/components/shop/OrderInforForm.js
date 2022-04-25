import React, {useReducer, useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_ADDRESS,
  SET_PHONE,
  SET_DESCRIPTION,
  SET_TITLE_VALIDATION,
  SET_ADDRESS_VALIDATION,
  SET_PHONE_VALIDATION,
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
    case SET_ADDRESS: {
      return {...state, address: {...state.address, value: payload}};
    }
    case SET_PHONE: {
      return {...state, phone: {...state.phone, value: payload}};
    }
    case SET_DESCRIPTION: {
      return {...state, description: {...state.description, value: payload}};
    }
    case SET_TITLE_VALIDATION: {
      return {...state, title: {...state.title, isValid: payload}};
    }
    case SET_ADDRESS_VALIDATION: {
      return {...state, address: {...state.address, isValid: payload}};
    }
    case SET_PHONE: {
      return {...state, phone: {...state.phone, isValid: payload}};
    }
    case SET_DESCRIPTION_VALIDATION: {
      return {...state, description: {...state.description,isValid: payload}};
    }

    default:
      return state;
  }
};

const OrderifForm = ({submitButtonTitle, orderif, onSubmit}) => {
  const initialFormState = {
    title: {value: orderif?.title, isValid: orderif ? true : false},
    address: {value: orderif?.address, isValid: orderif ? true : false},
    phone: {value: orderif?.phone, isValid: orderif ? true : false},
    description: {value: orderif?.description, isValid: orderif ? true : false},   
  };

  const [{title, address,phone,description}, dispatch] = useReducer(
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
      address.value &&
      phone.value &&
      description.value &&
      title.isValid &&
      address.isValid &&
      phone.isValid &&
      description.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    title.value,
    address.value,
    phone.value,
    description.value,
    title.isValid,
    address.isValid,
    phone.isValid,
    description.isValid,
    formIsValid,
  ]);

  const prodData = orderif
    ? {
        id: orderif.id,
        ownerId: orderif.ownerId,
        title: title.value,
        address: address.value,
        phone: phone.value,
        description: description.value,
      }
    : {
        ownerId: userId,
        title: title.value,
        address: address.value,
        phone: phone.value,
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
        label="Name"
        onChangeText={newTxt => dispatch({type: SET_TITLE, payload: newTxt})}
        isValid={title.isValid}
        setIsValid={val => dispatch({type: SET_TITLE_VALIDATION, payload: val})}
      />
 
      <LabledInput
        required
        autoCapitalize="none"
        value={address.value}
        label="ADDRESS"
        onChangeText={newTxt => dispatch({type: SET_ADDRESS, payload: newTxt})}
        isValid={address.isValid}
        setIsValid={val => dispatch({type: SET_ADDRESS_VALIDATION, payload: val})}
      />
        <LabledInput
        required
        autoCapitalize="sentences"
        value={phone.value}
        label="Gender"
        onChangeText={newTxt => dispatch({type: SET_PHONE, payload: newTxt})}
        isValid={phone.isValid}
        setIsValid={val => dispatch({type: SET_PHONE_VALIDATION, payload: val})}
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

export default OrderifForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
