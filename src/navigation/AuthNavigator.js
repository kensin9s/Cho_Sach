import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {Colors} from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';

const Stack = createStackNavigator();
const textColor = `rgb(${Colors.text.primary})`;
const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8-kws7CclM27kSvZrDTp6smQcfyLRoo8MAw&usqp=CAU"};

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{...styles.headerStyle, justifyContent: 'flex-end',marginTop:40}}>
              <Image source={image} style={{alignSelf:'center', width:200, height:160,}}/>
                <Text style={styles.Text}>Đăng ký</Text> 

              </View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-between',
                }}>
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
                <Image source={image} style={{alignSelf:'center', width:200, height:160,}}/>
                <Text style={styles.Text}>Đăng nhập</Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({
  headerStyle: {
    height: 250,
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 55,
  },
  backButton: {
    height: 42,
    width: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: 'Lato-Black',
    fontSize: 35,
    color: textColor,
    lineHeight: 60,
    
  },
Text: {
    fontFamily: 'Lato-Black',
    fontSize: 35,
    color: textColor,
    lineHeight: 60,
    alignSelf:'center',
  },
});
