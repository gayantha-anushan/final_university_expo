import {FlatList, StyleSheet, View, KeyboardAvoidingView, Text, Image, TouchableOpacity, Dimensions} from 'react-native'
import React,{useEffect,useState} from 'react'
import Header from '../components/Header'
import strawberry from '../assets/strawberry.jpg'
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage'
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

const BidItem = ({name, qty, price,image}) => (
    <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        borderColor: '#4A4A4A',
        borderWidth: 1,
        borderRadius:15
    }}>
        <Image source={{uri:image}} style={styles.itemImage}/>
        <View style={{
            width:Dimensions.get('window').width - 70
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize:18
            }} >{name}</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal:10
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#6B8E23',
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius:15
                }} >
                    <Text>Cancel Bid</Text>
                </TouchableOpacity>
                <View>
                    <Text>Qty: {qty}Kg</Text>
                    <Text>Bid Price: Rs.{price}</Text>
                    <Text style={{
                        backgroundColor: '#0080ff',
                        textAlign: 'center',
                        padding: 2,
                        color: '#fff',
                        borderRadius:15
                    }}>Accepted</Text>
                </View>
            </View>
        </View>
    </View>
);



const Cart = ({ navigation }) => {

    useEffect(() => {
        AsyncStorage.getItem("current_profile", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                fetch(getConnection() + "/api/auction/bidder-bids/" + result, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept":"application/json"
                    }
                }).then((result) => result.json()).then((jsonResult) => {
                    var datas = []
                    for (var i = 0; i < jsonResult.length; i++){
                        var dd = {
                            id: jsonResult[i]._id,
                            accepted: jsonResult[i].accepted,
                            amount: jsonResult[i].amount,
                            buy_after: jsonResult[i].buy_after,
                            image:getConnection()+"/post-img/"+ jsonResult[i].post.image,
                            title:jsonResult[i].post.title,
                            quantity:jsonResult[i].quantity
                        }
                        datas = datas.concat(dd);
                    }
                    setBidList(datas);
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }, [])
    
    
    const [isDirect, setIsDirect] = useState(true);
    const [bidList, setBidList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const renderItem = ({ item }) => (
        <Item name={item.name} qty={item.qty} price={item.price}/>
    );

    const bidRenderItem = ({ item }) => (<BidItem name={item.title} qty={item.quantity} image={ item.image} price={ item.amount} />)
    
    return (

        <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
                <Header navigation={navigation} />
                <View style={styles.buttonBar }>
                    <TouchableOpacity onPress={()=>setIsDirect(true)} style={{
                        backgroundColor: isDirect ?'#6B8E23':'#a4a4a4',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical:10
                    }}>
                        <Text>Direct Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ ()=>setIsDirect(false)} style={{
                        backgroundColor: isDirect ? '#a4a4a4' :'#6B8E23',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical:10
                    }}>
                        <Text>Bid Status</Text>
                    </TouchableOpacity>
                </View>
                {
                    isDirect ? (<FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />) :
                        ( <FlatList data={bidList} renderItem={bidRenderItem} keyExtractor={item => item.id}/> )
                }
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
    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    card:{
        borderColor:'#000000',
        borderRadius:10,
        borderWidth:1,
        margin:5,
        display: 'flex',
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
        fontSize: 20,
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