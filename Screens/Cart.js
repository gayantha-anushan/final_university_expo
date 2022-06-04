import {FlatList, StyleSheet, View, KeyboardAvoidingView, Text, Image, TouchableOpacity} from 'react-native'
import React,{ useEffect,useState } from 'react'
import Header from '../components/Header'
import strawberry from '../assets/strawberry.jpg'
import { getConnection } from '../Connection';

const DATA = [
    {
        id: '1',
        name: 'Red Onion',
        qty: '150',
        price: '15000',
    },
    {
        id: '2',
        name: 'Potato',
        qty: '50',
        price: '11000',
    },
];

const Item = ({name, qty, price}) => (
    <View style={styles.card}>
        <Image source={strawberry} style={styles.itemImage}/>
        <View style={styles.container}>
            <Text style={styles.item}>{name}</Text>
            <Text>Qty: {qty}Kg</Text>
            <Text>Price: Rs.{price}</Text>
        </View>
        <View style={styles.container1}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntxt}>Cancle Order</Text>
            </TouchableOpacity>
        </View>
    </View>
);



const Cart = ({ navigation }) => {
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");

    const cart = () => {
        fetch(getConnection() + '/api/cart/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
                setTitle(responseJson.title);
                setQty(responseJson.quantity)
                setPrice(responseJson.price)
            
            
        }).catch((error) => {
            console.log(error)
})
    }
    const renderItem = ({ item }) => (
        <Item name={item.name} qty={item.qty} price={item.price}/>
    );
    
    return (

        <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
                <Header navigation={navigation}/>
                <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/> 
            </KeyboardAvoidingView>
        </View>
        

    )
}

export default Cart

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
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    container:{
        justifyContent:'flex-start',
    },
    container1:{
        justifyContent:'flex-end',
    },
    itemImage:{
        height:50,
        width:50,
        margin:5,
        borderRadius:25
    },
    item:{
        fontWeight:'bold',
        fontSize:20,
    },
    btn:{
        backgroundColor:'green',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:100,
        borderRadius:20,
        marginRight:10
    },
    btntxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:14
    },
    
})