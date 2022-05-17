import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AddressForm from '../components/shop/AddressForm';
import {Context as AddressContext} from '../context/Address/AddressContext';

const EditAddressScreen = ({route}) => {
  const {
    state: {address},
    editAddress,
  } = useContext(AddressContext);

  const prodId = route.params.prodId;
  const selectedAddress = address.find(prod => prod.id === prodId);

  return (
    <View style={{backgroundColor:'#EEEEEE'}}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <AddressForm
          submitButtonTitle="Lưu"
           address={selectedAddress}
          
          onSubmit={async prodData => {
            try {
              await editAddress(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditAddressScreen;

const styles = StyleSheet.create({});
