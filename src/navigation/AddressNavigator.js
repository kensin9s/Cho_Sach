import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import UserAddressScreen from '../screens/UserAddressScreen';
import Icon from '../components/icons/LightIcons';
import EditAddressScreen from '../screens/editAddessScreen';
import {Colors} from '../constants/Colors';
import CreateAddressScreen from '../screens/CreateAddressScreen';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import PlusIcon from '../components/icons/PlusIcon';
import LeftIcon from '../components/icons/LeftIcon';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 100,
  },
};

const AddressNavigator = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator  screenOptions={screenOptions}>
      <Stack.Screen
        name="Address"
        component={UserAddressScreen}
        options={({navigation}) => ({
          title: 'Địa chỉ',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={`rgb(${Colors.text.primary})`}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAddress')}>
              <PlusIcon height={42} width={42} weight={1.3} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            marginEnd: 30,
          },
        })}
      />
      <Stack.Screen
        name="CreateAddress"
        component={CreateAddressScreen}
        options={({navigation}) => ({
          title: 'Thêm địa chỉ',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={`rgb(${Colors.text.primary})`}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={({navigation}) => ({
          title: 'Chỉnh sửa',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={`rgb(${Colors.text.primary})`}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
       {/* <Drawer.Screen
        name="AđdrFlow"
        component={AddressNavigator}
        options={{
          title: 'My Address',
          drawerIcon: AccountIcon,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AddressNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `rgb(${Colors.text.primary})`,
  },
  leftIcon: {
    marginLeft: 20,
  },
});
