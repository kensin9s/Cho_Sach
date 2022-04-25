// import React, {useContext, useEffect} from 'react';
// import {StyleSheet, TouchableOpacity} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import OrderInforScreen from '../screens/OrderInforScreen';
// import {Colors} from '../constants/Colors';
// import CartScreen from '../screens/CartScreen';
// import CartIcon from '../components/shop/CartIconComponent';
// import {Context as CartContext} from '../context/cart/CartContext';
// import LeftIcon from '../components/icons/LeftIcon';
// import FriesOddIcon from '../components/icons/FriesOddIcon';
// import Arrow from '../components/icons/Arrow';

// const Stack = createStackNavigator();

// const textPrimaryColor = `rgb(${Colors.text.primary})`;

// const screenOptions = {
//   headerTitleStyle: {
//     fontFamily: 'Lato-Black',
//     fontSize: 28,
//     marginLeft: 20,
//   },
//   headerStyle: {
//     height: 100,
//   },
// };

// const CategoryNavigator = () => {
//   const {clearCart} = useContext(CartContext);

//   useEffect(() => {
//     return () => {
//       clearCart();
//     };
//   }, []);
//   const { navigate } = useNavigation();
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//          <Stack.Screen
//         name="CartScreen"
//         component={CartScreen}
//         options={({navigation}) => ({
//             // title: 'Categories',
          
//        headerShown:false,
//           })}
        
//       />
//      <Stack.Screen
//         name="OrderInforScreen"
//         component={OrderInforScreen}
//         options={({navigation}) => ({
//           title: 'Categories',
//           headerRightContainerStyle: styles.rightIcon,
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => { navigate('CartScreen') }}>
           
//               <Arrow height={20}
//                   width={20}
//                  />
//             </TouchableOpacity>
//           ),
//           headerLeftContainerStyle: styles.leftIcon,
//         })}
//       /> 
//     </Stack.Navigator>
//   );
// };

// export default CategoryNavigator;

// const styles = StyleSheet.create({
//   backButton: {
//     height: 42,
//     width: 42,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 30,
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   rightIcon: {
//     marginRight: 30,
//   },
//   leftIcon: {
//     marginLeft: 20,
//   },
//   cart: {
//     height: 40,
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
