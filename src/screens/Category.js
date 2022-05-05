// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import {
//   StyleSheet,
//   FlatList,
//   View,
//   StatusBar,
//   ActivityIndicator,
//  Text,
//  TextInput,
//  TouchableOpacity,
//   RefreshControl,
// } from 'react-native';
// import Icon from '../components/icons/LightIcons';

// import CategoriesItem from '../components/shop/CategoriesItem';
// import {Context as CategoriesContext} from '../context/categories/CategoriesContext';
// import {Context as CartContext} from '../context/cart/CartContext';
// import {Colors} from '../constants/Colors';
// import {NO_CATEGORIES, REQUEST_NETWORK_ERROR} from '../context/categories/types';
// import ErrorScreen from '../components/shop/ErrorScreen';
// import {Context as AuthContext} from '../context/auth/AuthContext';

// const primaryColor = `rgb(${Colors.primary})`;
// const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
// const CartIcon = () => <Icon name="cart-o" color="white" size={20} />;




// const Category = ({navigation}) => {
//   const {
//     state: {categories, error},
//     getCategories,
//   } = useContext(CategoriesContext);

//   const {addToCart} = useContext(CartContext);
//   const {
//     state: {userId},
//   } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const favoritesLoaded = useRef(false);

//   const loadData = async () => {  
//     await getCategories(userId);

//     if (!favoritesLoaded.current) {
//       await getFavorites();
//       favoritesLoaded.current = true;
//     }
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     loadData().then(() => setIsLoading(false));
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', loadData);
//     return unsubscribe;
//   }, []);
//   const [text, onChangeText] = React.useState(null);
//   const [productFilter, setProductFilter] = React.useState(products);
//   const renderItem = useCallback(
//     ({item}) => (
//       <CategoriesItem
//         product={item}
//         navigationRoute="ProductDetail"
//         ActionIcon={CartIcon}
//       />
//     ),
//     [],
//   );

//   const refreshControl = useCallback(() => {
//     return (
//       <RefreshControl
//         refreshing={isRefreshing}
//         onRefresh={async () => {
//           setIsRefreshing(true);
//           await loadData();
//           setIsRefreshing(false);
//         }}
//         tintColor={primaryColor}
//         colors={[primaryColor]}
//       />
//     );
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={primaryColor} />
//       </View>
//     );
//   }

//   if (error.type === NO_CATEGORIES) {
//     return (
//       <View style={styles.centered}>
//         <Icon
//           name="emoticon-sad-outline"
//           size={26}
//           color={`rgba(${Colors.text.secondary}, 0.6)`}
//         />
//         <Text style={styles.errorMessage}>{error.message}</Text>
//       </View>
//     );
//   }

//   if (error.type === REQUEST_NETWORK_ERROR && !categories.length) {
//     return <ErrorScreen errorMessage={error.message} onRetry={loadData} />;
//   }
//   //  console.log(products);
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <View style={{flexDirection:'row'}}>
//       {/* <TextInput
//         style={styles.input}
//         onChangeText={(text) => {
//           setProductFilter(products.filter((u) => u.title.includes(text)));
//         }}
//         placeholder="What are you looking for?"
//       /> */}
//       </View>
//       <FlatList
//         refreshControl={refreshControl()}
//         data={categories}
//         contentContainerStyle={styles.list}
//         renderItem={renderItem}
//       />
//     </View>
//   );
 
// };


// export default Category;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#EEEEEE'
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 100,
//   },
//   errorMessage: {
//     fontFamily: 'Lato-Bold',
//     color: textSecondaryColor,
//     fontSize: 16,
//     marginTop: 10,
//   },
//   list: {
//     alignItems: 'center',
//   },
//   input: {
//     width: 350,
//     height: 50,
//     borderWidth: 5,
//     borderRadius: 10,
//     borderColor: "#C4C4C4",
//     marginLeft:20,
// },
// });
