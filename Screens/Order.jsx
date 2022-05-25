import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props =><Avatar.Icon {...props} icon="folder" />

const Order = () => {
    return (
        <Card style={styles.orderContainer}>
            <Card.Content>
            <Title>Order Title</Title>
            <Paragraph>Order Details</Paragraph>
            </Card.Content>
            <Card.Actions>
            <Button>Cancel Order</Button>
            <Button>Confirm Order</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    orderContainer : {
        margin: 10,
    }
})


export default Order;