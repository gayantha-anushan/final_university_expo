import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
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
import CompletePost from './Screens/CompletePost';
//import Drawer from './Screens/Drawer';
import DrawerContainer from './Screens/DrawerContainer';
import ViewProfile from './Screens/ViewProfile';
import ViewPost from './components/ViewPost';
import About from './Screens/About';
import SocketContext from './Context/SocketContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Contacts from './Screens/Contacts';
import { DefaultTheme , Provider as PaperProvider } from 'react-native-paper';

// import context API
import UserContext from './Context/UserContext';
import { getConnection } from './Connection';

// socket
const { io } = require("socket.io-client");
const socket = io(getConnection());

const stack = createNativeStackNavigator();
export default function App() {

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    AsyncStorage.getItem("current_profile", (error, result) => {
      if (error) {
        console.log(error)
      } else {
        if (result == null || result == undefined) {
          console.log("Not user Already availabale!")
        } else {
          AsyncStorage.getItem("auth_code", (error, resultx) => {
            if (error) {
              console.log(error)
            } else {
              if (resultx == null || resultx == undefined) {
                console.log("Token undefined!")
              } else {
                setUserData({
                  token: resultx,
                  user:result
                })
              }
            }
          })
        }
      }
    })
    
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
  }, []);
  
  const [socketData, setSocketData] = useState(null)

  const [userData , setUserData] = React.useState({
    token : undefined,
    user : undefined
  });

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6b8e23',
      accent: 'red',
      black : 'black'
    },
  };

  return (
    <SocketContext.Provider value={{socketData,setSocketData}}>
      <UserContext.Provider value={{userData , setUserData}}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
              <stack.Screen name="Login" component={Login} />
              <stack.Screen name="Register" component={Register} />
              <stack.Screen name="Home" component={Home}/>
              <stack.Screen name="Profile" component={Profile} />
              <stack.Screen name='DrawerContainer' component={DrawerContainer} />
              <stack.Screen name='ViewProfile' component={ViewProfile} />
              <stack.Screen name="ViewPost" component={ViewPost} />
              <stack.Screen name="About" component={About}/>
            </stack.Navigator>
          </NavigationContainer>
        </PaperProvider> 
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}









