import React , {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import Order from './Order';
import Header from './Header';
import { useTheme } from 'react-native-paper';

const Orders = ({navigation}) => {

    const title = "Orders";
    const {colors} = useTheme();

    return (
        <View style={styles.ordersContainer}>
            <Header title={title} navigation={navigation} />
            <Order />
            <Order />
        </View>
    ) 
}

const styles = StyleSheet.create({
    ordersContainer : {
        height :'100%'
    } 
})

export default Orders;