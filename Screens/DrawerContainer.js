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
import Settings from './Settings'
import Cart from './Cart'
import ViewBids from './ViewBids'
import CompletePost from './CompletePost'

const Drawer = createDrawerNavigator()

const DrawerContainer = () => {
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
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="ViewBids" component={ViewBids}/>
    </Drawer.Navigator>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({})