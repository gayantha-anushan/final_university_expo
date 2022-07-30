import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getConnection } from '../Connection';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Notification = ({id , firstName , lastName , date , transactionType , notifications , setNotifications}) => {

    const removeNotification = async() => {

        setNotifications(
            notifications.filter(notification => id !== notification._id)
        );

        fetch(getConnection() + "/api/cart/deletenotification/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => response.json()).then((jsonResult) => {
            console.log(jsonResult);
        })
    }

    return (
        <Card>
            <Card.Content>
            <Title>{'You have a '+transactionType+' from '+firstName+' '+lastName}</Title>
            <Paragraph>{'Date : '+date}</Paragraph>
            </Card.Content>
            <Card.Actions>
            <Button onPress={removeNotification}>Mark as Read</Button>
            </Card.Actions>
        </Card>
    )
};

export default Notification;


