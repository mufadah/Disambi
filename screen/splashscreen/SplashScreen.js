import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        AsyncStorage.getItem('username')
        .then((value) => {
            console.log('token',value)
            if(value){
                setTimeout(() => {
                    navigation.replace('Home')
                }, 4000);
            } 
            else{
                setTimeout(() => {
                    navigation.replace('Login')
                }, 4000);
            }
        })
    })


  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} backgroundColor={'white'}/>
    <Image source={require('../assets/Sisambi.png')} style={styles.logo}/>
      <Text style={styles.Text}>DISAMBI</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    Text:{
        marginTop:10,
        color:'black',
        fontSize:30,
        letterSpacing:2
    },
    logo:{
        width:200,
        height:200,

    }
})