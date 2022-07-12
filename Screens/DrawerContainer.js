import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Interface from './Interface'
import CreatePost from './CreatePost'
import Message from './Message'
import Draweri from './Drawer'
import ViewProfile from './ViewProfile'
import Notifications from './Notifications'
import Orders from './Orders';
import Stock from './Stock';
import Settings from './Settings'
import Cart from './Cart'
import ViewBids from './ViewBids'
import CompletePost from './CompletePost'
import Records from './Records'
import AsyncStorage from '@react-native-async-storage/async-storage' 
import UserContext from '../Context/UserContext'
import Contacts from './Contacts';
import ContactPost from './ContactPost';
import SellerBids from './SellerBids';


const Drawer = createDrawerNavigator()



const DrawerContainer = () => {

  const {setUserData} = React.useContext(UserContext);


  React.useEffect(() => {
    AsyncStorage.getItem('auth_code', (error, result) => {
        if (error) {
            console.log(error)
        } else {
            setUserData({
              token : result
            });
        }
    });
    AsyncStorage.getItem("current_profile", (error, result) => {
      if (error) {
          console.log(error)
      } else {
          setUserData({
            user : result
          });
      }
    });
  } , []);


  

  return (
    <Drawer.Navigator drawerContent={props=><Draweri {...props} />} initialRouteName='Interface' screenOptions={{ headerShown:false}}>
       <Drawer.Screen name="Interface" component={Interface} />
      <Drawer.Screen name="CreatePost" component={CreatePost}/>
      <Drawer.Screen name="Message" component={Message} />
      <Drawer.Screen name="ViewProfile" component={ViewProfile}/>
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="CompletePost" component={CompletePost}/>
      <Drawer.Screen name="Cart" component={Cart}/>
      <Drawer.Screen name="Orders" component={Orders} /> 
      <Drawer.Screen name="Records" component={Records}/>
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="ViewBids" component={ViewBids}/>
      <Drawer.Screen name="Stock" component={Stock}/>
      <Drawer.Screen name="Contacts" component={Contacts}/>
      <Drawer.Screen name="ContactPost" component={ContactPost}/>
      <Drawer.Screen name="SellerBids" component={SellerBids}/>
    </Drawer.Navigator>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({})