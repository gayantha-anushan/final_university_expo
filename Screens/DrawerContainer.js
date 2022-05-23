import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Interface from './Interface'
import CreatePost from './CreatePost'
import Message from './Message'
import Draweri from './Drawer'
import ViewProfile from './ViewProfile'
import Notifications from './Notifications'

const Drawer = createDrawerNavigator()

const DrawerContainer = () => {
  return (
    <Drawer.Navigator drawerContent={props=><Draweri {...props} />} initialRouteName='Interface' screenOptions={{ headerShown:false}}>
        <Drawer.Screen name="Interface" component={Interface} />
        <Drawer.Screen name="CreatePost" component={CreatePost}/>
      <Drawer.Screen name="Message" component={Message} />
      <Drawer.Screen name="ViewProfile" component={ViewProfile}/>
      <Drawer.Screen name="Notifications" component={Notifications}/>
    </Drawer.Navigator>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({})