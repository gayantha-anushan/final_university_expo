import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Bid = ({ bids, posttitle, postid, postdate, image,navigation }) => {
  
  useEffect(() => {
    console.log("Im working")
    console.log(posttitle)
  }, [])
  
    const LeftContent = props => <Avatar.Icon {...props} color={ bids > 0 ? '#fff':'#6b8e23'} style={{
        backgroundColor:bids > 0 ? "#6B8E23":"#fff"
  }} icon={bids > 0 ? 'check-bold' : 'clock'} />
  
  return (
    <Card>
      <Card.Title title={posttitle} subtitle={postdate} left={LeftContent} />
      <Card.Cover source={{ uri:image }} />
      <Card.Actions>
        <Button onPress={() => navigation.navigate("SellerBids", {
          id:postid
        })}>View Bids</Button>
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