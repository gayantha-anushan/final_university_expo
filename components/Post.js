import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';

const Post = ({username,postdate,title,quantity,price,type,image}) => {

    const [typeName, setTypeName] = useState("")
    const [isDirect, setIsDirect] = useState(false)

    useEffect(() => {
        if(type == "DIRECT"){
            setTypeName("Direct Sell")
            setIsDirect(true)
        }else{
            setTypeName("Auction")
            setIsDirect(false)
        }
    }, [])
    

  return (
    <View style={styles.card}>
        <View style={styles.container2}>
            <View style={styles.container1}>
                <Image source={strawberry} style={styles.userImage} />
                <View>
                    <Text style={styles.user}>{username}</Text>
                    <Text>{postdate}</Text>
                </View>
            </View>
              <TouchableOpacity style={styles.btn1}>
                  <AntDesign name="shoppingcart" size={20} color="black"></AntDesign>
                <Text>Add To Cart</Text>
            </TouchableOpacity>
        </View>
        <ImageBackground source={{uri:image}} style={styles.image}>
            <LinearGradient
                colors={["rgba(0,0,0,0.7)","transparent"]}
                style={styles.gradient}
            />
            <Text style={styles.titleText}>{title}</Text>
        </ImageBackground>
        <View style={styles.container2}>
            <View>
                <Text style={styles.typeBtn}>{typeName}</Text>
                <View style={styles.container1}>
                      <TouchableOpacity style={styles.btn1}>
                          <AntDesign name="enviroment" size={20} color="black"></AntDesign>
                        <Text>Location</Text>
                    </TouchableOpacity>
                      <TouchableOpacity style={styles.btn1}>
                          <AntDesign name="eye" size={20} color="black"></AntDesign>
                        <Text>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text>{quantity} kg</Text>
                <Text>Rs : {price}</Text>
            </View>
        </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    card:{
        borderColor:'#000000',
        borderRadius:10,
        borderWidth:1,
        margin:5
    },
    user:{
        fontWeight:'bold'
    },
    gradient:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    image:{
        height:250,
        resizeMode:'cover',
        width:'100%',
    },
    typeBtn:{
        marginLeft:8,
        fontWeight:'bold'
    },
    titleText:{
        color:'#ffffff',
        margin:8,
        fontWeight:'bold',
        fontSize:18
    },
    userImage:{
        height:50,
        width:50,
        margin:8,
        borderRadius:25
    },
    container1:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    container2:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    btn1:{
        backgroundColor:'#c4c4c4',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        margin:8,
        paddingHorizontal:10,
        borderRadius: 8,
        flexDirection:'row'
    }
})