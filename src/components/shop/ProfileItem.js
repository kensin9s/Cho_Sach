import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import Icon from '../../components/icons/LightIcons';
import {Colors} from '../../constants/Colors';
import ActionButton from './ActionButton';

const CARD_HEIGHT = 630;

const shadowOpts = {
  width: 320,
  height: 640,
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

const ProfileItem = ({
  profile,
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
      prodId: profile.id,
      title: profile.title,
    });
  }, [profile]);

  const actionPressHandler = useCallback(() => {
    if (params) {
      onActionPress(profile, params);
      return;
    }
    onActionPress(profile);
  }, [profile, params]);
// console.log(profile.title);
  return (
    <BoxShadow setting={shadowOpts}>
      
        <View style={styles.contentContainer}>
          <Image style={styles.image} source={{uri: profile.imageUrl}} />
          <View style={styles.infoSection}>
            <View style={styles.details}> 
              <Text style={styles.price}>Name :  {profile.title}</Text>
              <Text style={styles.title}>Gender :  {profile.gender}</Text>
              <Text style={styles.title}>Ađdress :  {profile.description}</Text>
              <Text style={styles.title}>Email :  {profile.emails}</Text>
              <Text style={styles.title}>Phone :  {profile.phone}</Text>
         
            </View>
            
              
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={onItemPress} style={{flexDirection:'row'}}>
              <Icon name="gear-o" size={30} color={'#3333FF'}  />
              <Text style={styles.titleProfile}>EditProfile</Text>
              </TouchableOpacity>
              </View>
             
         
            
            {/* {!hideActionButton && (
              <ActionButton
                title={actionTitle}
                Icon={ActionIcon}
                onPress={actionPressHandler}
                prodId={profile.id}
              />
            )} */}
          </View>
        </View>
      
    </BoxShadow>
  );
};

export default React.memo(ProfileItem);

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    // flexDirection: 'row',
    alignSelf:'center',
    paddingLeft: 20,
    paddingVertical: 20,
    marginRight:20,
    marginTop:20,

  },
  image: {
    flex: 2,
    borderRadius: 10,
    width:300,
    alignSelf:'center',
    marginTop:20
  },
  infoSection: {
    flex: 2,
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
    marginTop: 10,
  },
  titleProfile: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: `#3333FF`,
  },
  price: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    color: `rgb(${Colors.text.primary})`,
    width:200,
  },
});
