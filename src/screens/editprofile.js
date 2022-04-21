import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Context as ProfileContext} from '../context/Profile/ProfileContext';
import ProfileForm from '../components/shop/ProfileForm';
import {Colors} from '../constants/Colors';

const CreateProfileScreen = () => {
  const {createProfile} = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ProfileForm
          submitButtonTitle="Create Profile"
          onSubmit={async prodData => {
            try {
              await createProfile(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateProfileScreen;

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
