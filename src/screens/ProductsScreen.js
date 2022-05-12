import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  ActivityIndicator,
 Text,
 TextInput,
 TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from '../components/icons/LightIcons';

import ProductItem from '../components/shop/ProductItem';
import {Context as ProductContext} from '../context/product/ProductContext';
import {Context as CartContext} from '../context/cart/CartContext';
import {Colors} from '../constants/Colors';
import {NO_PRODUCTS, REQUEST_NETWORK_ERROR} from '../context/product/types';
import ErrorScreen from '../components/shop/ErrorScreen';
import {Context as AuthContext} from '../context/auth/AuthContext';

const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const CartIcon = () => <Icon name="cart-o" color="white" size={20} />;




const ProductsScreen = ({navigation, route}) => {
  const {
    state: {products, error},
    getProducts,
    getFavorites,
  } = useContext(ProductContext);
  const listFilter = route?.params?.listFilter;
  const {addToCart} = useContext(CartContext);
  const {
    state: {userId},
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const favoritesLoaded = useRef(false);

  const loadData = async () => {
    await getProducts(userId);

    if (!favoritesLoaded.current) {
      await getFavorites();
      favoritesLoaded.current = true;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, []);
  const [text, onChangeText] = React.useState(null);
  const [productFilter, setProductFilter] = React.useState(products);
  const renderItem = useCallback(
    ({item}) => (
      <ProductItem
        product={item}
        navigationRoute="ProductDetail"
        ActionIcon={CartIcon}
        actionTitle="Vào giỏ"
        onActionPress={addToCart}
      />
    ),
    [],
  );

  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  if (error.type === NO_PRODUCTS) {
    return (
      <View style={styles.centered}>
        <Icon
          name="emoticon-sad-outline"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  if (error.type === REQUEST_NETWORK_ERROR && !products.length) {
    return <ErrorScreen errorMessage={error.message} onRetry={loadData} />;
  }
  //  console.log(products);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{flexDirection:'row'}}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setProductFilter(products.filter((u) => u.title.includes(text)));
        }}
        placeholder="   Bạn cần tìm gì ?"
      />
      </View>
      <FlatList
        refreshControl={refreshControl()}
        // data={products}
        data={listFilter && listFilter.length > 0 ? listFilter : productFilter.length > 0 ? productFilter : products}
        keyExtractor={(item) => {
          return 'product' + item.id;
        }}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </View>
  );
 
};


export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EEEEEE'
  },
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
  list: {
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    marginLeft:20,
},
});
