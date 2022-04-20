import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import CategoriesScreen from '../screens/CategoryScreen';
import aaa from '../screens/aaa';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {Colors} from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartIcon from '../components/shop/CartIconComponent';
import {Context as CartContext} from '../context/cart/CartContext';
import LeftIcon from '../components/icons/LeftIcon';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import Arrow from '../components/icons/Arrow';

const Stack = createStackNavigator();

const textPrimaryColor = `rgb(${Colors.text.primary})`;

const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 120,
  },
};

const CategoryNavigator = () => {
  const {clearCart} = useContext(CartContext);

  useEffect(() => {
    return () => {
      clearCart();
    };
  }, []);
  const { navigate } = useNavigation();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
         <Stack.Screen
        name="aaa"
        component={aaa}
        options={({navigation}) => ({
            title: 'Categories',
            headerRight: () => (
              <CartIcon
                navigation={navigation}
                color={textPrimaryColor}
                style={styles.cart}
              />
            ),
            headerRightContainerStyle: styles.rightIcon,
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.toggleDrawer}>
               
               <FriesOddIcon
                height={52}
                width={52}
                weight={1}
                color={textPrimaryColor}
              />
                
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: styles.leftIcon,
          })}
        
      />
     <Stack.Screen
        name="category"
        component={CategoryScreen}
        options={({navigation}) => ({
          title: 'Categories',
          headerRight: () => (
            <CartIcon
              navigation={navigation}
              color={textPrimaryColor}
              style={styles.cart}
            />
          ),
          headerRightContainerStyle: styles.rightIcon,
          headerLeft: () => (
            <TouchableOpacity onPress={() => { navigate('aaa') }}>
           
              <Arrow height={20}
                  width={20}
                 />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
     
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({navigation}) => ({
          title: 'My Cart',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={navigation.goBack}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={textPrimaryColor}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
