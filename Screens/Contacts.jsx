import React , {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native';
import Header from './Header';
import Contact from './Contact';

const Contacts = ({navigation}) => {

    const title = "Contacts";

    return (
        <View style={styles.ContactsContainer}>
            <Header title={title} navigation={navigation} />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
        </View>
    ) 
}

const styles = StyleSheet.create({
    ContactsContainer : {
        height :'100%'
    } 
})

export default Contacts;