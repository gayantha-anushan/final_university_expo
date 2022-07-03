import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { List } from 'react-native-paper';

const Contact = ({id , firstName , lastName , type , navigation}) => {

    const getPost = () => {
        navigation.navigate('ContactPost' , {id : id});
    }

    return (
        <View style={styles.contactContainer}>
            <TouchableOpacity onPress={getPost}>
                <List.Item
                    title={firstName +" "+lastName}
                    description={type}
                    left={props => <List.Icon {...props} icon="message" />}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    contactContainer : {
        margin : 10
    }
})

export default Contact;