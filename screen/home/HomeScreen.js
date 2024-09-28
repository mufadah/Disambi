import { Button, FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const [load, setLoad]=useState(false)

    const hapus =()=>{
        AsyncStorage.removeItem('username')
        navigation.navigate('Login')
    }
    const potong =()=>{
        AsyncStorage.getItem('username')
        .then((value) => {
            console.log(value)
            value.slice(0,1)})
    }
    const ngambil =()=>{
        AsyncStorage.getItem("token")
        .then(value => {
            console.log('token', value)
            setLoad(true)
            return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/',{
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ value
                },
                
              })
            .then(response => response.json())
            .then(json => {
                // console.log("data dusun", json)
                if(json?.data){
                    setData(json?.data)
                }
                setLoad(false)
            })
            .catch(error => {
                console.error(error);
                setLoad(false)
            });
        })
        .catch(err => console.error(err))
    }
    

    useEffect(()=>{
        ngambil()
        const unsubscribe = navigation.addListener('focus', () => {
            ngambil()
         })
         return unsubscribe;
    },[navigation])
    
    const renderItem = ({item}) =>{
        return(
            <View style={styles.item}>
                <Text style={styles.Text1}>{item?.name}</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/trash.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        )
    }
  return (
    <View style={styles.container}>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#047cd2'}/>
      <View style={styles.header}>
        <Text>{potong}</Text>
        <Text style={styles.Text}>Home</Text>
        <TouchableOpacity style={styles.logout} onPress={()=>hapus()}>
            <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
      refreshControl={
         <RefreshControl refreshing={load} onRefresh={() => ngambil()}/>
      }
      renderItem={renderItem}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{flex:1,alignItems:'center'}}
      />
      <TouchableOpacity style={styles.tambah} onPress={()=> navigation.navigate('Tambah')}>
        <Text style={styles.Text2}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    Text:{
        color:'black',
        fontSize:20,
        marginRight:-50
    },
    header:{
        width:'100%',
        height:70,
        backgroundColor:'#047cd2',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        flexDirection:'row'
    },
    item:{
        width:350,
        height:50,
        backgroundColor:'white',
        elevation:5,
        borderRadius:4,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    Text1:{
        color:'black',
        marginLeft:10
    },
    icon:{
        width:25,
        height:25,
        marginRight:5
    },
    Text2:{
        fontSize:50,
    },
    tambah:{
        width:70,
        height:70,
        borderRadius:4,
        backgroundColor:'#ffca28',
        position:'absolute',
        elevation:5,
        bottom:0,
        right:0,
        marginBottom:20,
        marginRight:20,
        alignItems:'center',
        justifyContent:'center'
    },
    logout:{
        width:90,
        height:50,
        marginTop:25
    }

})