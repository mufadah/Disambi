import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ingat, setIngat] = useState(false)

    const eling =()=>{
        setIngat(!ingat)
    }
    const log = ()=>{

        return fetch ('https://dev-disambi.sandboxindonesia.id/api/auth/login/',{
            method: 'POST',
            headers: {
                Accept:'application/json', 
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .then (response => response.json())
    .then (json=> {
        if(json?.data){
            AsyncStorage.setItem('token', json?.data?.access_token);
            console.log(json)
            Alert.alert(json?.message)
            navigation.replace('Home')
        }
        else{
            Alert.alert(json?.message)
        }
    })
    .catch(err=>{
        console.log(err)
    })
    }

    const remember =()=>{
        if(ingat==true){
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('Password', password);
        }else{
            return('')
        }
    }
        useEffect(()=>{
            remember()
        })

  return (
    <View style={styles.container}>
    <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>

    {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Sisambi.png')} style={styles.logo}/>
        <Text style={styles.Text}>DISAMBI</Text>

        <TextInput 
        placeholder='Masukan Username' 
        placeholderTextColor={'grey'} 
        style={styles.input} 
        value={username}
        onChangeText={text => setUsername(text)}
        />

        <TextInput 
        placeholder='Masukan Password' 
        placeholderTextColor={'grey'} 
        style={styles.input1} 
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        />
      </View>
      <View style={styles.bawah}>
            <TouchableOpacity onPress={()=>eling()} style={styles.pencetan}>
                {ingat ?(
                    <Image source={require('../assets/check.png')} style={styles.check}/>
                ) : (
                    <View style={styles.check1}></View>
                )
                }
            </TouchableOpacity>
            <Text style={styles.text}>Ingatkan Saya </Text>
        </View>
        <View style={styles.login_div}>
            <TouchableOpacity style={styles.login_button} onPress={()=>log()}> 
                <Text style={styles.login_text}>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    Text:{
        marginTop:10,
        color:'black',
        fontSize:15,
        letterSpacing:2,
        fontWeight:'bold'
    },
    text:{
        color:'black',
        marginLeft:10
    },
    login_text:{
        color:'white',
        fontWeight:'bold'
    },
    logo:{
        marginTop:100,
        width:100,
        height:100,
    },
    header:{
        alignItems:'center',
    },
    input:{
        width:300,
        height:50,
        backgroundColor:'white',
        elevation:5,
        borderRadius:4,
        color:'black',
        marginTop:30
    },
    input1:{
        width:300,
        height:50,
        backgroundColor:'white',
        elevation:5,
        borderRadius:4,
        marginTop:20,
        color:'black'
    },
    check:{
        width:20,
        height:20,
        borderRadius:4
    },
    check1:{
        width:20,
        height:20,
        backgroundColor:'white',
        elevation:5,
        borderRadius:4
    },
    pencetan:{
        marginLeft:50
    },
    bawah:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:30
    },
    login_button:{
        width:200,
        height:50,
        backgroundColor:'#0076d6',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center'
    },
    login_div:{
        alignItems:'center',
        marginTop:20
    }
})