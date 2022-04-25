import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Context as OrderInforContext} from '../context/orderinfomation/OrderInformationContext';
import OrderInforForm from '../components/shop/OrderInforForm';
import {Colors} from '../constants/Colors';

const CreateOrderInforScreen = () => {
  const {createOrderif} = useContext(OrderInforContext);
  console.log('createOrderif', createOrderif);

  return createOrderif !== null ? (

    <View style={styles.container}>
      {/* <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <OrderInforForm
          submitButtonTitle="Create Orderinfor"
          onSubmit={async prodData => {
            try {
              await createOrderif(prodData);
            } catch (err) {
              throw err;s
            }
          }}
        />
      </KeyboardAwareScrollView> */}
      <Text>MÍ</Text>
    </View>
  ) : (
    <View style={styles.container}>
    <Text>null</Text>
  </View>
  );
};

export default CreateOrderInforScreen;

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
