import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import UserProfileScreen from '../screens/UserProfileScreen';
import Icon from '../components/icons/LightIcons';
import EditProfileScreen from '../screens/EditProfileScreen';
import {Colors} from '../constants/Colors';
import CreateProfileScreen from '../screens/CreateProfileScreen';
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

const ProfileNavigator = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UserAdmin"
        component={UserProfileScreen}
        options={({navigation}) => ({
          title: 'Trang cá nhân',
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => navigation.toggleDrawer()}>
              <FriesOddIcon
                height={52}
                width={52}
                weight={1}
                color={colors.text}
              />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={({navigation}) => ({
          title: 'Information',
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
        name="EditProfile"
        component={EditProfileScreen}
        options={({navigation}) => ({
          title: 'Edit',
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
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

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
