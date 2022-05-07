import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Post = () => {
  return (
    <View style={styles.card}>
        <View>
            <View style={styles.container1}>
                <Image style={styles.userImage} />
                <View>
                    <Text style={styles.user}>Piyasena Farm</Text>
                    <Text>2020/01/01</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.btn1}>
                <Text>Add To Cart</Text>
            </TouchableOpacity>
        </View>
        <Image/>
        <View>
            <View>
                <Text>Direct Sell</Text>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.btn1}>
                        <Text>Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn1}>
                        <Text>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text>100 kg</Text>
                <Text>Rs : 15 000.00</Text>
            </View>
        </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    user:{
        fontWeight:'bold'
    },
    userImage:{
        height:50,
        width:50,
        borderRadius:25
    },
    container1:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'left',
        alignItems:'center'
    },
    btn1:{
        backgroundColor:'#c4c4c4',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:5
    }
})