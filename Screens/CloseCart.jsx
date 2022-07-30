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

const MyComponent = ({index , cartItems , setCartItems ,sellerId}) => {

    const {userData} = React.useContext(UserContext);

    const [visible, setVisible] = React.useState(false);
    const [value, setValue] = React.useState('3');
    const [comment, setComment] = React.useState("")
  
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const completeOrder = () => {

        fetch(Connection.getConnection() + '/api/cart/closecartItem/' + index , {
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

        fetch(Connection.getConnection() + '/api/auth/createrate' , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            },
            body : JSON.stringify({
                rateeId : sellerId,
                raterId : userData.user,
                rate : parseInt(value),
                comment : comment
            })
        })

        setCartItems(cartItems.filter(item => item.id !== index));
        setVisible(false);

    }
  
    return (
        <View>
            <TouchableOpacity onPress={showDialog} style={styles.btn}>
                <Text style={styles.btntxt}>Close Order</Text>
            </TouchableOpacity>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>

            <Dialog.Title>Rate This Seller</Dialog.Title>
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

  const styles = StyleSheet.create({
    btn: {
        backgroundColor:'#6B8E23',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 120,
        borderRadius: 20,
        marginRight: 10,
    },
    btntxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },

})