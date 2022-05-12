import React, {useCallback, useContext} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import AddressItem from '../components/shop/AddressItem';
import {Context as AddressContext} from '../context/Address/AddressContext';
import {Context as CartContext} from '../context/cart/CartContext';
import {CommonActions} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import Icon from '../components/icons/LightIcons';

const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const DeleteIcon = () => <Icon name="trash-o" size={20} color="white" />;
const ShopIcon = ({color}) => <Icon name="shop-o" size={20} color={color} />;
const UserAddressScreen = ({navigation}) => {
  const {
    state: {userAddress, addressNavKey},
    deleteAddress,
  } = useContext(AddressContext);

  const {removeFromCart} = useContext(CartContext);

  const actionPressHandler = useCallback(
    (item, addressNavKey) => {
      if (addressNavKey) {
        navigation.dispatch({
          ...CommonActions.reset({
            routes: [{name: 'Address'}],
          }),
          target: addressNavKey,
        });
      }
      deleteAddress(item.id);
      removeFromCart(item);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => (
      <AddressItem
        address={item}
        navigationRoute="EditAddress"
        ActionIcon={DeleteIcon}
        actionTitle="Xóa"
        onActionPress={actionPressHandler}
        params={addressNavKey}
      />
    ),
    [navigation, actionPressHandler, addressNavKey],
  );
  console.log('you:',userAddress);

  if (!userAddress.length) {
    return (
      <View style={styles.centered}>
        <Icon
          name="warning"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>Bạn chưa thêm địa nào.</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor:'#EEEEEE'}}>
      <FlatList data={userAddress} renderItem={renderItem} />
    </View>
  );
};

export default UserAddressScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
});
