import React, { Component } from 'react'
import { Text, View, Image, Dimensions,TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
const { width } = Dimensions.get('window')

const styles = {
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
  }
}

export default class extends Component {
  render() {
    return (
      <View style={{height:200,}}>
        <Swiper  autoplayTimeout={5} 
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
          <TouchableOpacity
            style={styles.slide}
            title={
            <Text style={styles.text} numberOfLines={1}>Ẩm thực</Text>}
          >
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/amthuc.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
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
      
    )
  }
}