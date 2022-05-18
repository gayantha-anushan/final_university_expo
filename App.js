import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Profile';
// import Interface from './Screens/Interface';
// import Message from './Screens/Message';
// import CreatePost from './Screens/CreatePost';
//import Drawer from './Screens/Drawer';
import DrawerContainer from './Screens/DrawerContainer';
import ViewProfile from './Screens/ViewProfile';
import ViewPost from './Screens/ViewPost';

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Home" component={Home}/>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Register" component={Register} />
        <stack.Screen name="Profile" component={Profile} />
        {/* <stack.Screen name="Interface" component={Interface} />
        <stack.Screen name="CreatePost" component={CreatePost}/>
        <stack.Screen name="Message" component={Message} /> */}
        {/* <stack.Screen name="Drawer" component={Drawer} /> */}
        <stack.Screen name='DrawerContainer' component={DrawerContainer} />
        <stack.Screen name='ViewProfile' component={ViewProfile} />
        <stack.Screen name="ViewPost" component={ViewPost}/>
      </stack.Navigator>

    </NavigationContainer>
    
    
    
  );
}









