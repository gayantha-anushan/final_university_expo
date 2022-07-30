import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper'
import BidContent from '../components/BidContent';
import { FlatList } from 'react-native-gesture-handler';
import { getConnection } from '../Connection';

const ViewBids = ({ route, navigation }) => {
    const { id } = route.params
    const [content, setcontent] = useState([])

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            fetch(getConnection() + "/api/auction/bids/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                }
            }).then((result) => result.json()).then((jsonResult) => {
                var data = [];
                for (var i = 0; i < jsonResult.length; i++){
                    data = data.concat({
                        _id:jsonResult[i]._id,
                        authorname: jsonResult[i].bidder.firstname+" "+jsonResult[i].bidder.lastname,
                        amount: jsonResult[i].amount,
                        quantity: jsonResult[i].quantity,
                        buydate:jsonResult[i].buy_after,
                    })
                }
                setcontent(data)
            }).catch((error) => {
                console.log(error)
            })
        })
    }, [])
    

    const renderItem = ({ item }) => <BidContent buydays={ item.buydate} authorname={item.authorname} amount={item.amount} quantity={ item.quantity} />

  return (
      <View>
          <Appbar.Header>
              <Appbar.BackAction onPress={() => navigation.navigate('CompletePost',{id:id})} />
              <Appbar.Content title="All Bids" subtitle="Think About your Bid"/>
          </Appbar.Header>
          <FlatList data={content} renderItem={renderItem} keyExtractor={ item => item._id}/>
    </View>
  )
}

export default ViewBids
//'#6b8e23'
const styles = StyleSheet.create({
    header: {
        
    }
})