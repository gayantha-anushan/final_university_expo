import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph ,Dialog, Portal  , Provider} from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection  from '../Connection';

const MyComponent = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [days, setDays] = React.useState("")

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const updateStatus = () => {
    var date = new Date();
    fetch(Connection.getConnection() + "/api/cart/approvedseller/" + props.index, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'token': authCode,
        },
        body: JSON.stringify({
            daysToTransaction : parseInt(days),
            finalDate : date.setDate(date.getDate() + parseInt(days))
        })
    }).then((result) => result.json()).then((jres) => {
        // console.log(jres);
    }).catch((error) => {
        console.log(error);
    });
    fetch(Connection.getConnection() + '/api/sales/createsale' , {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'token': authCode,
      },
      body : JSON.stringify({
        sellerId : props.sellerId,
        buyerId : props.buyerId,
        cartId : props.index
      })
    }).then((result) => result.json()).then((jres) => {
      console.log(jres);
    }).catch((error) => {
        console.log(error);
    });
    props.setToggle(false);
    setVisible(false);
    setDays("");
}


  return (
      <View>
        <Button onPress={showDialog}>Confirm Order</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Add a Number of Days</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Days..."
                value={days}
                onChangeText={days => {
                  setDays(days);
                  props.setRemainDays(days);
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={updateStatus}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default MyComponent;
