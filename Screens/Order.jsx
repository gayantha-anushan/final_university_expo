import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection  from '../Connection';
import DialogOrders from './DialogOrders';
import { useEffect } from 'react';
import UserContext from '../Context/UserContext';

const LeftContent = props =><Avatar.Icon {...props} icon="folder" />

const Order = ({navigation , buyerId , qty , price , index , isApproved , orders , setOrders}) => {

    const [toggle , setToggle] = useState(!isApproved);
    // this is not update
    const [user , setUser] = useState();

    // context api
    const {userData} = React.useContext(UserContext);

    // use context api
    useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            // AsyncStorage.getItem('auth_code', (error, result) => {
            //     if (error) {
            //         console.log(error)
            //     } else {
            //         setAuthCode(result)
            //     }
            // })
            AsyncStorage.getItem("current_profile", (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    setUser(result);
                }
            })
        })
    },[]);

    

    const cancelOrder = () => {
        console.log("You cancel the order");
    }

    const completeOrder = () => {

        fetch(Connection.getConnection() + '/api/sales/updatesale/' + index , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            },
        }).then((result) => result.json()).then((jres) => {
            console.log(jres);
        }).catch((error) => {
            console.log(error);
        });

        fetch(Connection.getConnection() + '/api/cart/removecartitem/' + index , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
              }
        }).then((result) => result.json()).then((jres) => {
            console.log(jres);
        }).catch((error) => {
            console.log(error);
        });

        setOrders(orders.filter(order => order._id !== index));

    }

    return (
        <Card style={styles.orderContainer}>
            <Card.Content>
            <Title>Title</Title>
            <Title>From : {buyerId.firstname} &nbsp;{buyerId.lastname}</Title>
            <Paragraph>Price : {price} &nbsp;&nbsp;&nbsp;Quantity : {qty}</Paragraph>
            </Card.Content>
            <Card.Actions>
            {
                toggle ? (
                    <DialogOrders 
                    index={index} 
                    setToggle={setToggle}
                    buyerId={buyerId}
                    sellerId={userData.user}
                    />
                ) : (
                    <View>
                    <TouchableOpacity onPress={completeOrder}>
                        <Button>Complete Order</Button>
                    </TouchableOpacity>
                    </View>
                )
                
            }
            {
                !toggle ? (
                    <TouchableOpacity >
                        <Button>Cancel Order</Button>
                    </TouchableOpacity>
                ) : null
            }
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