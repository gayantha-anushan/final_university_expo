import { StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Records = ({ navigation }) => {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Interface")}>
                <AntDesign name="arrowleft" size={30}></AntDesign>
                </TouchableOpacity>
                <Text style={styles.text}>Records</Text>
            </View>
            <View style={styles.des}>
                <Text style={styles.head}>Hi,Amal Srinath</Text>
                <Image style={styles.logo} source={require('../assets/profile.jpg')} />
            </View>
            <View style={styles.des1}>
                <Text style={styles.head1}>Analytics</Text>
            </View>
            <View style={styles.cardcont}>
                <View style={styles.card1}>
                    <View style={styles.cardinsert}>
                        <Text>85.5%</Text>
                        <Text>hgh</Text>
                    </View>
                </View>
                <View style={styles.card2}>
                    <Text>85.5%</Text>
                </View>
            </View>
        </View>
  )
}

export default Records

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#a9a9a9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        width:50,
        height: 50,
        display: 'flex',
        borderRadius:30
    },
    des: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent:'space-around'
        
    },
    des1: {
        
    },
    head: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily:'sans-serif-medium'
        
    },
    head1: {
        color: '#6B8E23',
        fontSize: 20,
        fontFamily: 'sans-serif-medium',
        fontWeight:'bold'
    },
    card1: {
        backgroundColor: '#87cefa',
        padding: 60,
        borderRadius: 20,
        paddingVertical: 90,
        
    },
    card2: {
        backgroundColor: '#9370db',
        padding: 60,
        borderRadius: 20,
        paddingVertical: 80,
    },
    cardcont: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
    },
    cardinsert: {
        display: 'flex',
        flexDirection:'row'
    }
})