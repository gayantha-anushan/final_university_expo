import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import strawberry from '../assets/strawberry.jpg'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Bid = ({ bids,postimg,posttitle,postid,postdate}) => {
    const LeftContent = props => <Avatar.Icon {...props} color={ bids > 0 ? '#fff':'#6b8e23'} style={{
        backgroundColor:bids > 0 ? "#6B8E23":"#fff"
    }} icon={ bids > 0 ? 'check-bold':'clock'} />
  return (
     <Card>
          <Card.Title title={posttitle} subtitle={postdate} left={LeftContent} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>View Bids</Button>
      <Button>End Bid</Button>
    </Card.Actions>
  </Card>
  )
}

export default Bid

const styles = StyleSheet.create({
        orderContainer : {
        margin: 10,
    }
})