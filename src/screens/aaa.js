import React, {useContext, useState} from "react";
import {Context as ProductContext} from '../context/product/ProductContext';
import { SafeAreaView, StyleSheet, TextInput, Text, ImageBackground, Image, TouchableOpacity, View,Dimensions } from "react-native";
import { useEffect } from "react/cjs/react.production.min";
import Swiper from 'react-native-swiper'
import {BoxShadow} from 'react-native-shadow';

import {Colors} from '../constants/Colors';
const { width } = Dimensions.get('window')
const CARD_HEIGHT = 50;

const shadowOpts = {
  width: 100,
  height: 50,
  color: '#FF3300',
  border: 33,
  radius: 20,
  opacity: 0.1,
  x: 15,
  y: 25,
  style: {
    // The parent view that contains all the content

    height: CARD_HEIGHT,
    width: 100,
    marginTop:20,
    marginHorizontal: 30,
    marginLeft: 30,
  },
};
const Login = ({navigation}) => {
    const {
        state: {products, error},
        getProducts,
        getFavorites,
      } = useContext(ProductContext);
    const filterListbyCateTinhcam = () => {
        const datas = products.filter(data => data.category === 'tinh yeu');
        navigation.navigate('category', {listFilter : datas });
    }
    const filterListbyCateLamGiau = () => {
      const datas = products.filter(data => data.category === 'lam giau');
      navigation.navigate('category', {listFilter : datas });
  }
  const filterListbyCateTheThao = () => {
    const datas = products.filter(data => data.category === 'the thao');
    navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateManga = () => {
  const datas = products.filter(data => data.category === 'manga');
  navigation.navigate('category', {listFilter : datas });
}

const filterListbyCateThieuNhi = () => {
  const datas = products.filter(data => data.category === 'thieu nhi');
  navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateAmThuc = () => {
  const datas = products.filter(data => data.category === 'am thuc');
  navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateKhoaHoc = () => {
  const datas = products.filter(data => data.category === 'khoa hoc');
  navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateKinhDi = () => {
  const datas = products.filter(data => data.category === 'kinh di');
  navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateChinhTri = () => {
  const datas = products.filter(data => data.category === 'chinh tri');
  navigation.navigate('category', {listFilter : datas });
}
const filterListbyCateKhac = () => {
  const datas = products.filter(data => data.category === 'khac');
  navigation.navigate('category', {listFilter : datas });
}
  

  return (
    <SafeAreaView>
<Text style={{fontWeight:'bold',fontSize:35,fontFamily:'serif',marginLeft:20,marginBottom:20,}}>Nổi Bật Nhất</Text>
       <View style={{height:200,borderRadius:10}}>
        <Swiper  autoplayTimeout={5} autoplay
          style={styles.wrapper}
          height={200}
          onMomentumScrollEnd={(e, state, context) =>
            console.log('index:', state.index)
          }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#000',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          paginationStyle={{
            bottom: -23,
            left: null,
            right: 10
          }}
          loop
        >
               
          <TouchableOpacity
            onPress={filterListbyCateLamGiau}
            style={styles.slide}
            title={
              <Text style={styles.text} numberOfLines={1}>Làm giàu</Text>
            }
          >
       

            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/lamgiau.jpg')}
            />
        
          </TouchableOpacity>
          <TouchableOpacity
              onPress={filterListbyCateTinhcam}
            style={styles.slide}
            title={
              <Text style={styles.text} numberOfLines={1}>Ngôn tình</Text>
            }
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/ngontinh.jpg')}
            />
         </TouchableOpacity>
          {/* <TouchableOpacity
          onPress={filterListbyCateAmThuc}
            style={styles.slide}
            title={
            <Text style={styles.text} numberOfLines={1}>Ẩm thực</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/amthuc.jpg')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
          onPress={filterListbyCateManga}
            style={styles.slide}
            title={
              <Text style={styles.text} numberOfLines={1}>Manga</Text>
            }
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/manga.jpg')}
            />
           </TouchableOpacity>
           <TouchableOpacity
           onPress={filterListbyCateTheThao}
            style={styles.slide}
            title={
              <Text style={styles.text} numberOfLines={1}>Thể thao</Text>
            }
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/theduc.jpg')}
            />
           </TouchableOpacity>
           <TouchableOpacity
           onPress={filterListbyCateThieuNhi}
            style={styles.slide}
            title={
              <Text style={styles.text} numberOfLines={1}>Thiếu nhi</Text>
            }
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/thieunhi.jpg')}
            />
           </TouchableOpacity>
        </Swiper>
        
      </View>
<View style={{marginTop:50,marginLeft:10,borderTopWidth:1,marginRight:10}}>
    {/* <TouchableOpacity style={{width:70,height:50,borderRadius:20,backgroundColor:'black',marginTop:10,borderWidth:1,shadowRadius:10,}}>
<Text style={{color:'white',alignSelf:'center',marginTop:10}}>Tình cảm</Text>
    </TouchableOpacity> */}
</View >
<Text style={{fontWeight:'bold',fontSize:25,fontFamily:'serif',marginLeft:20,marginTop:20,marginBottom:10}}>Một vài thể loại khác.</Text>
<View style={{flexDirection:'row',alignSelf:'center'}}>
<TouchableOpacity style={styles.touch1} onPress={filterListbyCateAmThuc}>
            <Text style={styles.title}>Ẩm thực</Text>    
    </TouchableOpacity>
    <TouchableOpacity style={styles.touch2} onPress={filterListbyCateKinhDi}>
            <Text style={styles.title}>Kinh dị</Text>    
    </TouchableOpacity>
    <TouchableOpacity style={styles.touch2} onPress={filterListbyCateChinhTri}>
            <Text style={styles.title}>Chính trị</Text>    
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',alignSelf:'center'}} onPress={filterListbyCateKhoaHoc}>
<TouchableOpacity style={styles.touch1}>
            <Text style={styles.title}>Khoa học</Text>    
    </TouchableOpacity>
    <TouchableOpacity style={styles.touch2} onPress={filterListbyCateKhac}>
            <Text style={styles.title}>Khác</Text>    
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
  text1 :{
    color:'white',
    fontSize:30,
    marginTop:50,
    alignSelf:'center'},
    container: {
      flex: 1
    },
  
    wrapper: {},
  
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
  
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
  
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
  
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
  
    text: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
    },
  
    image: {
      width,
      flex: 1
    },
    contentContainer: {
      height: '100%',
      width: '100%',
     backgroundColor:'#001100',
      borderRadius: 20,
      overflow: 'hidden',
      flexDirection: 'row',
      paddingLeft: 20,
      paddingVertical: 20,
    },
    image1: {
      flex: 5,
      borderRadius: 10,
    },
    infoSection: {
      flex: 3,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    details: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {color:'#111111',alignSelf:'center',marginTop:10,fontSize:18,fontStyle:'italic',fontWeight:'bold',},
    touch1: {width:100,height:50,borderRadius:20,backgroundColor:'#DDDDDD',marginTop:10,borderWidth:1,shadowRadius:10,},
    touch2: {width:100,height:50,borderRadius:20,backgroundColor:'#DDDDDD',marginTop:10,borderWidth:1,shadowRadius:10,marginLeft:20,},
    

});
