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
import { getConnection } from '../Connection';

const LeftContent = props =><Avatar.Icon {...props} icon="folder" />

const Order = ({navigation , buyerId , qty , price , index , isApproved , orders , setOrders , title , remainDays , postId , type }) => {

    const [toggle , setToggle] = useState(!isApproved);
    // this is not update
    const [user , setUser] = useState();
    const [days , setRemainDays] = useState(remainDays);

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
            console.log(buyerId);
            AsyncStorage.getItem("current_profile", (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    setUser(result);
                }
            })
        })
    },[]);

    const chatNow = () => {
        fetch(getConnection() + "/api/chat/new_connection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                user: buyerId._id,
                user2:userData.user
            })
        }).then(resul => resul.json()).then(trex => {
            navigation.navigate("chatscreen", {
                id:trex.id
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    const cancelOrder = () => {
        fetch(Connection.getConnection() + '/api/cart/cancelcartitem/' + index , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            },
            body : JSON.stringify({
                qty : qty,
                postId : postId,
            })
        }).then((result) => result.json()).then((jres) => {
            console.log(jres);
        }).catch((error) => {
            console.log(error);
        });

        setOrders(orders.filter(order => {
            return order._id !== index;
        }));
    }


    return (
        <Card style={styles.orderContainer}>
            <Card.Content>
            <Title>{title}</Title>
            <Title>From : {buyerId.firstname} &nbsp;{buyerId.lastname}</Title>
            <Paragraph>Price : {price} &nbsp;&nbsp;&nbsp;Quantity : {qty}</Paragraph>
            {
                days ? (
                    <Paragraph>Remain Days : {parseInt(days)}</Paragraph>
                ) : null
            }
            </Card.Content>
            <Card.Actions>
                <Button onPress={()=>chatNow()} >Chat</Button>
                {
                    type == 'localseller' ? <Button onPress={() => navigation.navigate('Direction' , {'sellerId' : buyerId._id})}>Delivery</Button> : null
                }
            {
                toggle ? (
                    <DialogOrders 
                    index={index} 
                    setToggle={setToggle}
                    buyerId={buyerId}
                    sellerId={userData.user}
                    title={title}
                    setRemainDays={setRemainDays}
                    postId={postId}
                    qty={qty}
                    />
                ) : (
                    <View>
                    {/* <TouchableOpacity onPress={completeOrder}>
                        <Button>Complete Order</Button>
                    </TouchableOpacity> */}
                        <CompleteOrder 
                        index={index}
                        buyerId={buyerId}
                        sellerId={userData.user}
                        orders={orders}
                        setOrders={setOrders}
                        qty={qty}
                        price={price}
                        title={title}
                        postId={postId}
                        type={type}
                        />
                    </View>
                )
                
            }
            {
                !toggle ? (
                    <View>
                        <Button onPress={cancelOrder}>{type == 'localseller' ? 'Cancel' : 'Cancel Order'}</Button>
                    </View>   
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