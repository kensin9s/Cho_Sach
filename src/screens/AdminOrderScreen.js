import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AdminOrderItem from '../components/shop/AdminOrderItem';
import {Context as AdminOrderContext} from '../context/AdminOrder/AdminOrderContext';
import {Context as AuthContext} from '../context/auth/AuthContext';
import {Colors} from '../constants/Colors';
import ErrorScreen from '../components/shop/ErrorScreen';

const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;

const AdminOrdersScreen = ({navigation}) => {
  const {
    state: {adminorders},
    getAdminOrders,
  } = useContext(AdminOrderContext);
  const {
    state: {userId},
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      await getAdminOrders(userId);
      setError('');
    } catch (err) {
      if ((err.message = 'Network Error')) {
        setError('Please check your internet connection.');
      } else {
        setError(err.message);
      }
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  if (error && !adminorders.length) {
    return <ErrorScreen errorMessage={error} onRetry={loadData} />;
  }

  if (!adminorders.length && !error) {
    return (
      <View style={styles.centered}>
        <Icon
          name="emoticon-sad-outline"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>You have no orders yet.</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor:'#EEEEEE'}}>
    <FlatList
      refreshControl={
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
      }
      data={adminorders}
      contentContainerStyle={{paddingHorizontal: 25, paddingBottom: 10}}
      renderItem={({item}) => <AdminOrderItem adminOrderItem={item} />}
    />
    </View>
  );
};

export default AdminOrdersScreen;

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
