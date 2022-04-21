import React, {useCallback, useContext, useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import ProfileItem from '../components/shop/ProfileItem';
import {Context as ProfileContext} from '../context/Profile/ProfileContext';
import {Context as AuthContext} from '../context/auth/AuthContext';
import {CommonActions} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import Icon from '../components/icons/LightIcons';
import PlusIcon from '../components/icons/PlusIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';

const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const DeleteIcon = () => <Icon name="trash-o" size={20} color="white" />;

const UserProfileScreen = ({navigation}) => {
  const {
    state: {userProfile, profileNavKey},
    getProfile
  } = useContext(ProfileContext);

  const {
    state: {userId},
  } = useContext(AuthContext);
  const loadProfile = async () => {
    await getProfile(userId);
  }
  useEffect(() => {
    loadProfile()
  console.log('userProfile',userProfile)

  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProfile);
    return unsubscribe;
  }, []);
  const actionPressHandler = useCallback(
    (item, profileNavKey) => {
      if (profileNavKey) {
        navigation.dispatch({
          ...CommonActions.reset({
            routes: [{name: 'Profile'}],
          }),
          target: profileNavKey,
        });
      }
      deleteProfile(item.id);
    
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => (
      <ProfileItem
        profile={item}
        navigationRoute="EditProfile"
        onActionPress={actionPressHandler}
        params={profileNavKey}
      />
    ),
    [navigation, actionPressHandler, profileNavKey],
  );

  if (!userProfile.length) {
    return (
    
      <View style={styles.centered}>
        <Icon
          name="warning"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>You have not added any information.{'\n'} Please add your information to display.</Text>
        <TouchableOpacity  style={{alignSelf:'center',marginTop:100 ,width:150,height:50,borderRadius:20,borderWidth:1,borderColor:'black'}} onPress={() => navigation.navigate('CreateProfile')}>
            {/* <PlusIcon marginTop={100} height={42} width={42} weight={1.3} name="warning"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`} /> */}
          <Icon name="plus" size={20} color={'red'} style={{alignSelf:'center',marginTop:15}} />
          
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{backgroundColor:'#EEEEEE'}}>
      <FlatList data={userProfile} renderItem={renderItem} />
    </View>
  );
};

export default UserProfileScreen;

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
