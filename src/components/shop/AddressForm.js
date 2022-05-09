import React, {useReducer, useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_PRICE,
  SET_DESCRIPTION,
  SET_TITLE_VALIDATION,
  SET_PRICE_VALIDATION,
  SET_DESCRIPTION_VALIDATION,
} from './inputTypes';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import {Context as AuthContext} from '../../context/auth/AuthContext';

const priceValidator = text => {
  if (isNaN(text) || parseFloat(text) < 0) {
    return {isValid: false, error: 'Please enter a valid positive price'};
  }
  return {isValid: true};
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_TITLE: {
      return {...state, name: {...state.name, value: payload}};
    }
    case SET_PRICE: {
      return {...state, phoney: {...state.phoney, value: payload}};
    }
    case SET_DESCRIPTION: {
      return {...state, country: {...state.country, value: payload}};
    }
    case SET_TITLE_VALIDATION: {
      return {...state, name: {...state.name, isValid: payload}};
    }
    case SET_PRICE_VALIDATION: {
      return {...state, phoney: {...state.phoney, isValid: payload}};
    }
    case SET_DESCRIPTION_VALIDATION: {
      return {...state, country: {...state.country, isValid: payload}};
    }

    default:
      return state;
  }
};

const AddressForm = ({submitButtonTitle, address, onSubmit}) => {
  const initialFormState = {
    name: {value: address?.name, isValid: address ? true : false},
    phoney: {value: address?.phoney, isValid: address ? true : false},
    country: {value: address?.country, isValid: address ? true : false},
  };

  const [{name, phoney, country}, dispatch] = useReducer(
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
      name.value &&

      phoney.value &&
      country.value &&
      name.isValid &&
     
      phoney.isValid &&
      country.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    name.value,
   
    phoney.value,
    country.value,
    name.isValid,
   
    phoney.isValid,
    country.isValid,
    formIsValid,
  ]);

  const prodData = address
    ? {
        id: address.id,
        ownerId: address.ownerId,
        name: name.value,
   
        country: country.value,
        phoney: parseFloat(phoney.value),
      }
    : {
        ownerId: userId,
        name: name.value,
     
        country: country.value,
        phoney: parseFloat(phoney.value),
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
        value={name.value}
        label="Họ và Tên"
        onChangeText={newTxt => dispatch({type: SET_TITLE, payload: newTxt})}
        isValid={name.isValid}
        setIsValid={val => dispatch({type: SET_TITLE_VALIDATION, payload: val})}
      />
 
      <LabledInput
        required
        value={phoney.value?.toString()}
        label="Số điện thoại"
        keyboardType="numeric"
        onChangeText={
        newTxt => dispatch({type: SET_PRICE, payload: newTxt})
        }
        validators={[priceValidator]}
        isValid={phoney.isValid}
        setIsValid={val => dispatch({type: SET_PRICE_VALIDATION, payload: val})}
      />
      <LabledInput
        required
        multiline
        large
        autoCapitalize="sentences"
        value={country.value}
        label="Địa chỉ"
        onChangeText={newTxt =>
          dispatch({type: SET_DESCRIPTION, payload: newTxt})
        }
        isValid={country.isValid}
        setIsValid={val =>
          dispatch({type: SET_DESCRIPTION_VALIDATION, payload: val})
        }
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

export default AddressForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
