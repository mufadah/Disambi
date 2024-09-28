import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tambah = ({navigation}) => {
    const [inputan, setInputan]=useState('')

    const pindah =()=>{
        Add()
        navigation.navigate('Home')
    }
    const Add=()=>{
        AsyncStorage.getItem("token")
        .then(value => {
            console.log('token', value)
            return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/',{
                method: 'Post',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ value
                },
                body: JSON.stringify({
                    name: inputan
                })
              })
              .then(response => response.json())
              .catch(err=>{
                console.log(err)
              })
    })}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Text}>Tambah Dusun</Text>
      </View>
      <TextInput 
      placeholder='Masukan Nama Dusun' 
      placeholderTextColor={'grey'} 
      style={styles.inputan}
      value={inputan}
      onChangeText={Text=> setInputan(Text)}
      />
      <TouchableOpacity style={styles.Tambah_button} onPress={pindah}>
        <Text style={styles.Text_button}>Tambah</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Tambah

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    header:{
        backgroundColor:'#0075d8',
        width:'100%',
        height:70,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    Text:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    inputan:{
        width:300,
        height:50,
        backgroundColor:'white',
        elevation:5,
        marginTop:20,
        borderRadius:4,
        color:"black"
    },
    Tambah_button:{
        width:200,
        height:50,
        borderRadius:4,
        backgroundColor:'#006fde',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    Text_button:{
        color:'white',
        fontWeight:'bold'
    }
    
})