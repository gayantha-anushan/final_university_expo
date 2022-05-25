import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { List } from 'react-native-paper';

const Contact = () => (
    <View style={styles.contactContainer}>
    <TouchableOpacity>
        <List.Item
            title="Customer Name"
            description="Galle"
            left={props => <List.Icon {...props} icon="phone" />}
        />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
    contactContainer : {
        margin : 10
    }
})

export default Contact;