import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    image: 'https://freenice.net/wp-content/uploads/2021/10/ve-don-gian-ma-cute.jpg',
    title: 'First Book',
  },
  {
    id: '2',
    image: 'https://freenice.net/wp-content/uploads/2021/10/hinh-ve-don-gian-de-thuong.jpg',
    title: 'Second Book',
  },
  {
    id: '3',
    image: 'https://freenice.net/wp-content/uploads/2021/10/hinh-ve-don-gian-de-thuong-nhat.jpg',
    title: 'Third Book',
  },
];

const Item = ({ title }) => (
  <View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image style={styles.image} source={{uri: item.image}} resizeMode='cover'/>
        <Item title={item.title} image={item.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.category}>Category</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: width/2,
    marginRight: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    alignItems: 'center'
  },
  image: {
      width: 200,
      height: 250,
  },
  category: {
      fontSize: 30,
      color: 'black',
  }
});

export default App;