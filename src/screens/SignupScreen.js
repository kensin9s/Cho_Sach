import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AuthForm from '../components/shop/AuthForm';
import {Colors} from '../constants/Colors';
import {Context as AuthContext} from '../context/auth/AuthContext';

const textColor = `rgb(${Colors.text.primary})`;
const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;

const SignupScreen = ({navigation}) => {
  const {signUp} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View>
          <KeyboardAwareScrollView contentContainerStyle={{paddingTop: 40}}>
            <AuthForm
              buttonTitle="Đăng ký"
              onSubmit={async props => await signUp({...props})}
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Đăng nhập.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
  },
  linkText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: textColor,
  },
  link: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: primaryLightColor,
  },
});
