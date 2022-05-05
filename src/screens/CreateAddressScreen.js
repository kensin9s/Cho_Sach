import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Context as AddressContext} from '../context/Address/AddressContext';
import AddressForm from '../components/shop/AddressForm';
import {Colors} from '../constants/Colors';

const CreateAddressScreen = () => {
  const {addAddress} = useContext(AddressContext);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <AddressForm
          submitButtonTitle="Create Address"
          onSubmit={async prodData => {
            try {
              await addAddress(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  screenTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: `rgb(${Colors.text.primary})`,
  },
});
