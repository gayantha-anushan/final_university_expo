import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import strawberry from '../assets/strawberry.jpg'
import { FontAwesome } from '@expo/vector-icons';

const BidContent = () => {
  return (
      <View style={ styles.cardCover}>
          <View style={ styles.cardHeader}>
            <Image source={strawberry} style={styles.imgStyle} />
            <View>
                  <Text style={ styles.title}>Gayan Anush</Text>
                <View style={ styles.ratingContainer}>
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star" size={24} color="gold" />
                    <FontAwesome name="star-o" size={24} color="gold" />
                    <FontAwesome name="star-o" size={24} color="gold" />
                </View>
              </View>
          </View>
          <Text>Amount(RS) : 200.00</Text>
          <Text>Quantity : 1000. Kg</Text>
          <Text>Buy After 1 Day(s)</Text>
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