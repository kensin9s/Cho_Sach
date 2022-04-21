import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ProfileForm from '../components/shop/ProfileForm';
import {Context as ProfileContext} from '../context/Profile/ProfileContext';

const EditProfileScreen = ({route}) => {
  const {
    state: {profile},
    editProfile,
  } = useContext(ProfileContext);

  const prodId = route.params.prodId;
  const selectedProfile = profile.find(prod => prod.id === prodId);

  return (
    <View style={{backgroundColor:'#EEEEEE'}}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ProfileForm
          submitButtonTitle="Save"
           profile={selectedProfile}
          
          onSubmit={async prodData => {
            try {
              await editProfile(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
