import { StyleSheet, View, KeyboardAvoidingView, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import strawberry from '../assets/strawberry.jpg'


const Notifications = ({navigation}) => {
    return (
        <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation}/>
                <View style={styles.card}>
                    <View style={styles.container1}>
                        <Image source={strawberry} style={styles.userImage}/>
                        <View>
                            <Text style={styles.user}>Amal Srinath</Text>
                            <Text>2022/05/16</Text>
                        </View>
                        <View>
                            <Text>Direct Sell</Text>
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>View Order</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    },
    card:{
        borderColor:'#000000',
        borderRadius:10,
        borderWidth:1,
        margin:5,
    },
    container1:{
        margin:10,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    container2:{
        margin:5,
        alignItems:'center'
    },
    userImage:{
        height:50,
        width:50,
        margin:5,
        borderRadius:25
    },
    user:{
        fontWeight:'bold',
        fontSize:20,
    },
    btn:{
        backgroundColor:'green',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:150,
        borderRadius:20,
        marginTop:10,
        marginLeft:8
    },
    btntxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    }
})
  