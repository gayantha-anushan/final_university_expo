import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper'
import BidContent from '../components/BidContent';

const ViewBids = ({ route, navigation }) => {
    const { id} = route.params
  return (
      <View>
          <Appbar.Header>
              <Appbar.BackAction onPress={() => navigation.navigate('CompletePost',{id:id})} />
              <Appbar.Content title="All Bids" subtitle="Think About your Bid"/>
          </Appbar.Header>
          <BidContent/>
          <Text>This is id : { id}</Text>
    </View>
  )
}

export default ViewBids
//'#6b8e23'
const styles = StyleSheet.create({
    header: {
        
    }
})