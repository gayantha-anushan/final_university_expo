import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph ,Dialog, Portal  , Provider} from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection  from '../Connection';
// import Radio from './Radio';
import { RadioButton } from 'react-native-paper';
import UserContext from '../Context/UserContext';

const MyComponent = ({index , orders , setOrders , buyerId , sellerId , qty , price , title , postId}) => {

    const {userData} = React.useContext(UserContext);

    const [visible, setVisible] = React.useState(false);
    const [value, setValue] = React.useState('3');
    const [comment, setComment] = React.useState("")
  
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const completeOrder = () => {

        fetch(Connection.getConnection() + '/api/sales/updatesale/' + index , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            },
            body : JSON.stringify({
                qty : qty,
                postId : postId
            })
        }).then((result) => result.json()).then((jres) => {
            console.log(jres);
        }).catch((error) => {
            console.log(error);
        });

        fetch(Connection.getConnection() + '/api/auth/createrate' , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            },
            body : JSON.stringify({
                rateeId : buyerId,
                raterId : userData.user,
                rate : parseInt(value),
                comment : comment
            })
        })

        fetch(Connection.getConnection() + '/api/cart/finishcartitem/' + index , {
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

        // fetch(Connection.getConnection() + '/api/stock/updatestock/'+ postId._id , {
        //     method : 'POST',
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         // 'token': authCode,
        //     }
        // }).then((result) => result.json()).then((jres) => {
        //     console.log(jres);
        // }).catch((error) => {
        //     console.log(error);
        // });


        setOrders(orders.filter(order => order._id !== index));
        setVisible(false);

    }
  
    return (
        <View>
          <Button onPress={showDialog}>Complete Order</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>

            <Dialog.Title>Rate This Buyer</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="Very Bad" value="1" />
                    <RadioButton.Item label="Bad" value="2" />
                    <RadioButton.Item label="Okay" value="3" />
                    <RadioButton.Item label="Good" value="4" />
                    <RadioButton.Item label="Very Good" value="5" />
                </RadioButton.Group>
                <TextInput
                    label="Add a Comment.."
                    value={comment}
                    onChangeText={comment => setComment(comment)}
                />
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={completeOrder}>Finish</Button>
            </Dialog.Actions>

              
            </Dialog>
          </Portal>
        </View>
    );
  };
  
  export default MyComponent;

