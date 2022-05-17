import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import Icon from '../../components/icons/LightIcons';
import {Colors} from '../../constants/Colors';
import ActionButton from './ActionButton';

const CARD_HEIGHT = 250;

const shadowOpts = {
  width: 320,
  height: 220,
  color: '#FF0000',
  border: 33,
  radius: 20,
  opacity: 0.1,
  x: 15,
  y: 25,
  style: {
    // The parent view that contains all the content

    height: CARD_HEIGHT,
    width: 350,
    marginBottom: 30,
    marginHorizontal: 30,
    marginLeft: 30,
  },
};

const AddressItem = ({
  address,
  onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
}) => {
  const navigation = useNavigation();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      prodId: address.id,
      name: address.name,
    });
  }, [address]);

  const actionPressHandler = useCallback(() => {
    if (params) {
      onActionPress(address, params);
      return;
    }
    onActionPress(address);
  }, [address, params]);

  return (
    <BoxShadow setting={shadowOpts}>
      {/* <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}> */}
        <View style={styles.contentContainer}>
          <View style={styles.infoSection}>
            <View style={styles.details}>
              <Text style={styles.price}>Name: {address.name}</Text>
              <Text style={styles.title}>Phone: {address.phoney}</Text>
              <Text style={styles.title}>Address: {address.country}</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:10,}}>
              <TouchableOpacity onPress={onItemPress} style={{flexDirection:'row'}}>
              <Icon name="gear-o" size={30} color={'#3333FF'}  />
              <Text style={styles.title}>Edit</Text>
              </TouchableOpacity>
              </View>
              
              {/* {!hideActionButton && (
                <ActionButton
                  title={actionTitle}
                  Icon={ActionIcon}
                  onPress={actionPressHandler}
                  prodId={address.id}
                />
              )} */}
          </View>
        </View>
      {/* </TouchableOpacity> */}
    </BoxShadow>
  );
};

export default React.memo(AddressItem);

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  image: {
    flex: 5,
    borderRadius: 10,
  },
  infoSection: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Lato-Black',
    fontSize: 24,
    color: `rgb(${Colors.text.primary})`,
  },
});
