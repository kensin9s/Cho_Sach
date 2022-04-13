import React, {useContext, useState} from "react";
import {Context as ProductContext} from '../context/product/ProductContext';
import { SafeAreaView, StyleSheet, TextInput, Text, ImageBackground, Image, TouchableOpacity, View } from "react-native";
import { useEffect } from "react/cjs/react.production.min";

const Login = ({navigation}) => {
    const {
        state: {products, error},
        getProducts,
        getFavorites,
      } = useContext(ProductContext);
    //   console.log('products', products);
// console.log('products111', products);
    const filterListbyCateTinhcam = () => {
        console.log('1');
        const datas = products.filter(data => data.category === 'tinh yeu');

        // setDataFiltered(datas);
        //  console.log('dataFiltered', dataFiltered);
        navigation.navigate('category', {listFilter : datas });
    }
    const filterListbyCateLamGiau = () => {
      console.log('1');
      const datas = products.filter(data => data.category === 'aaa');

      // setDataFiltered(datas);
      //  console.log('dataFiltered', dataFiltered);
      navigation.navigate('category', {listFilter : datas });
  }
  

  return (
    <SafeAreaView>
        <View style={{marginTop:50}}>
    
  <TouchableOpacity style={styles.touch} onPress={filterListbyCateTinhcam}>
      <Text style={styles.text}> tinhcam</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{width:300,height:150,backgroundColor:'green'}}>
      <Text style={{color:'white',fontSize:30,alignSelf:'center'}}>kiemhiep</Text>
  </TouchableOpacity>

  <TouchableOpacity style={{width:300,height:150,backgroundColor:'red'}} onPress={filterListbyCateLamGiau}>
      <Text style={{color:'white',fontSize:30,alignSelf:'center'}}>lamgiau</Text>
  </TouchableOpacity>
        
  </View>

    </SafeAreaView>

  );
};


export default Login;
const styles = StyleSheet.create({
  touch :{
    width:300,height:150,backgroundColor:'blue',
    borderRadius:15,
    marginBottom:20,
  },
  text :{
    color:'white',
    fontSize:30,
    marginTop:50,
    alignSelf:'center'},

});
