import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection  from '../Connection';
import DialogOrders from './DialogOrders';
import CompleteOrder from './CompleteOrder';
import { useEffect } from 'react';
import UserContext from '../Context/UserContext';
import { useTheme } from 'react-native-paper';



const StockItem = ({navigation , title ,qty , date , itemColor }) => {

    const [state , setState] = React.useState();

    const { colors } = useTheme();

    const LeftContent = props => <Avatar.Icon {...props}  style={{backgroundColor: itemColor}}/>

    return (
        <View>
            <Card>
                <Card.Title left={LeftContent} />
                <Card.Content>
                <Title><Text style={{color: itemColor}}>{title}</Text></Title>
                <Paragraph><Text style={{color: itemColor}}>Date : {date}</Text></Paragraph>
                <Paragraph><Text style={{color: itemColor}}>Quantity : {qty}KG</Text></Paragraph>
                </Card.Content>
                <Card.Actions>
                <Button style={{backgroundColor: itemColor}}><Text style={{color: colors.black}}>View Details</Text></Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

export default StockItem;