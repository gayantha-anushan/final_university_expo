import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, ToastAndroid } from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Connection from '../Connection';

const DialogReport = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const submitReport = () => {
    fetch(Connection.getConnection() + "/api/reports/createreport", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'token': authCode,
      },
      body: JSON.stringify({
        reporterId: props.reportorId,
        reporteeId: props.reporteeId,
        title: title,
        description: description
      })
    }).then((result) => result.json()).then((jres) => {
      console.log(jres);
    }).catch((error) => {
      console.log(error);
    });
    setTitle("");
    setDescription("");
    setVisible(false);
  }


  return (
    <View>
      <Button onPress={showDialog}>Report User</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Submit a Report</Dialog.Title>
          <Dialog.Content>
            <View style={{ margin: 5, marginTop: 10, marginBottom: 10 }}>
              <Text>Title</Text>
            </View>
            <TextInput
              label="Type Title Here..."
              value={title}
              onChangeText={title => setTitle(title)}
            />
            <View style={{ margin: 5, marginTop: 10, marginBottom: 10 }}>
              <Text>Description</Text>
            </View>
            <TextInput
              label="Type Description Here..."
              value={description}
              onChangeText={description => setDescription(description)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={submitReport}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogReport;
