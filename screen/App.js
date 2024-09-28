import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home/HomeScreen';
import Login from './login/Login';
import SplashScreen from './splashscreen/SplashScreen';
import Tambah from './tambah/Tambah';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{
        headerShown:false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tambah" component={Tambah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

