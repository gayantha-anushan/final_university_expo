import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { FontAwesome } from '@expo/vector-icons';
import { getConnection } from '../Connection';

const BidContent = ({ author_id, authorname, amount, image, quantity, buydays }) => {
    
    const [rate, setRate] = useState(0);
    const [rates, setRates] = useState(0);
    
    useEffect(() => {
        if (author_id != undefined) {
            fetch(getConnection() + "/api/auth/userrate/" + author_id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                }
            }).then((result) => result.json()).then((resultJson) => {
                setRate(resultJson.rate);
                setRates(resultJson.rates)
            })
        }
    }, [author_id])
    

  return (
      <View style={ styles.cardCover}>
          <View style={ styles.cardHeader}>
            <Image source={{uri:image}} style={styles.imgStyle} />
            <View>
                  <Text style={styles.title}>{ authorname}</Text>
                  {
                      rates == 0 ? (<View>
                          <Text>There are no rates yet</Text>
                      </View>):(
                  <View style={ styles.ratingContainer}>
                                  {rate >= 1 ? (<FontAwesome name="star" size={24} color="gold" />) : (<FontAwesome name="star-o" size={24} color="gold" />)}
                                  {rate >= 2 ? (<FontAwesome name="star" size={24} color="gold" />) : (<FontAwesome name="star-o" size={24} color="gold" />)}
                                  {rate >= 3 ? (<FontAwesome name="star" size={24} color="gold" />) : (<FontAwesome name="star-o" size={24} color="gold" />)}
                                  {rate >= 4 ? (<FontAwesome name="star" size={24} color="gold" />) : (<FontAwesome name="star-o" size={24} color="gold" />)}
                                  { rate >= 5 ? (<FontAwesome name="star" size={24} color="gold" />):(<FontAwesome name="star-o" size={24} color="gold" />) }
                </View>
                      )
                }
              </View>
          </View>
          <Text>Amount(RS) : { amount}</Text>
          <Text>Quantity : { quantity} Kg</Text>
          <Text>Buy within { buydays} Day(s) after Approval</Text>
    </View>
  )
}

export default BidContent

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight:'bold'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems:'center'
    },
    imgStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 10
    },
    cardCover: {
        borderColor: '#6A6A6A',
        margin: 10,
        borderWidth: 1,
        borderRadius:10
    },
    ratingContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'row'
    }
})