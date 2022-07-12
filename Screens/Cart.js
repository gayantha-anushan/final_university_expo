import {FlatList, StyleSheet, View, KeyboardAvoidingView, Text, Image, TouchableOpacity,Dimensions} from 'react-native'
import React,{ useEffect,useState } from 'react'
import Header from '../components/Header'
import strawberry from '../assets/strawberry.jpg'
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
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

const Item = ({id,name, qty, price,image , isApproved , cartItems , setCartItems , remainDays}) => {

    const deleteCartItem = async () => {
        fetch(getConnection() + "/api/cart/removecartitem/"+id , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => response.json()).then((jsonResult) => {
            console.log(jsonResult);
        })
        console.log('clicked');
        setCartItems(
            cartItems.filter(cartItem =>  cartItem.id !== id)
        );
    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius:15,
            borderWidth: 1,
            padding: 3,
            margin:5
        }}>
            <Image source={{ uri: image }} style={{
                height: 50,
                width: 50,
                margin:5,
                borderRadius:25
            }}/>
            <View style={{
                width:Dimensions.get("screen").width - 78
            }}>
                <Text style={styles.item}>{name}</Text>
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection:'row'
                }}>
                    <View>
                        <Text>Qty: {qty}Kg</Text>
                        <Text>Price: Rs.{price}</Text>
                        {
                            remainDays ? (
                                <Text>Remain Days: {remainDays}</Text>
                            ) : (
                                <Text></Text>
                            )
                        }
                    </View>
                    {
                        isApproved ? (
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>Order Approved</Text>
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity style={styles.btn} onPress={deleteCartItem}>
                            <Text style={styles.btntxt}>Cancel Order</Text>
                        </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View>
    )
};

const BidItem = ({ id, name, qty, price, image, accepted,cancelBid }) => {

    return (
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
                    <TouchableOpacity disabled={ accepted} style={{
                    backgroundColor: accepted ? '#a4a4a4' : '#6B8E23',
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15
                }} onPress={ ()=>cancelBid(id)}>
                    <Text>Cancel Bid</Text>
                </TouchableOpacity>
                <View>
                    <Text>Qty: {qty}Kg</Text>
                    <Text>Bid Price: Rs.{price}</Text>
                    <Text style={{
                        backgroundColor: accepted ? '#0080ff':'#ff1100',
                        textAlign: 'center',
                        padding: 2,
                        color: '#fff',
                        borderRadius:15
                    }}>{
                            accepted ? "Accepted":"Not Accepted"
                    }</Text>
                </View>
            </View>
        </View>
    </View>
);
}



const Cart = ({ navigation }) => {

    // useEffect(() => {

    // }, [])

    const [animating , setAnimating] = React.useState(true);

    useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            setAnimating(true);
            AsyncStorage.getItem('auth_code', (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    setAuthCode(result)
                }
            })
            AsyncStorage.getItem("current_profile", (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    loadBids(result)
                    setProfile(result)
                    loadCartItems(result);
                    
                }
            })
        })
        console.log("USe Effext Called");
    }, [])
    
    const loadCartItems = (result) => {
        fetch(getConnection() + "/api/cart/" + result, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => response.json()).then((jsonResult) => {
            var datas = []
            for (var i = 0; i < jsonResult.length; i++){
                datas = datas.concat({
                    id: jsonResult[i]._id,
                    title:jsonResult[i].postId.title,
                    quantity: jsonResult[i].qty,
                    price: jsonResult[i].price,
                    image:getConnection()+ '/post-img/' +jsonResult[i].postId.image,
                    isApproved : jsonResult[i].isApproved,
                    remainDays : parseInt(jsonResult[i].remainDays)
                })
            }
            setCartItems(datas);
            console.log(datas);
            setAnimating(false);
        })
    };

    const loadBids = (result) => {
        fetch(getConnection() + "/api/auction/bidder-bids/" + result, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((result) => result.json()).then((jsonResult) => {
            var datas = []
            for (var i = 0; i < jsonResult.length; i++) {
                var dd = {
                    id: jsonResult[i]._id,
                    accepted: jsonResult[i].accepted,
                    amount: jsonResult[i].amount,
                    buy_after: jsonResult[i].buy_after,
                    image: getConnection() + "/post-img/" + jsonResult[i].post.image,
                    title: jsonResult[i].post.title,
                    quantity: jsonResult[i].quantity
                }
                datas = datas.concat(dd);
            }
            setBidList(datas)
        }).catch((error) => {
            console.log(error)
        })
    }

    const cancelBid = (id) => {
        fetch(getConnection() + "/api/auction/deletebid/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': authCode,
                'profile': profile
            }
        }).then((result) => result.json()).then((jres) => {
            console.log(jres);
            loadBids(profile)
        }).catch((error) => {
            console.log(error)
        })
    }
    
    
    const [isDirect, setIsDirect] = useState(true);
    const [bidList, setBidList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [authCode, setAuthCode] = useState(null);
    const [profile, setProfile] = useState(null)
    const [CartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const renderItem = ({ item }) => (
        <Item id={item.id} name={item.title} qty={item.quantity} price={item.price} image={item.image} isApproved={item.isApproved} remainDays={item.remainDays} cartItems={CartItems} setCartItems={setCartItems}/>
    );

    const bidRenderItem = ({ item }) => (<BidItem cancelBid={cancelBid} accepted={item.accepted} id={item.id} name={item.title} qty={item.quantity} image={item.image} price={item.amount} />)
    

    // check the conditional render
    const renderItem1 = ({item}) => {
        if(item.price == 400){
            return <Item id={item.id} name={item.title} qty={item.quantity} price={item.price} image={item.image} /> 
        }
    }


    return (

        <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
                <Header navigation={navigation} />
                <View style={styles.buttonBar}>
                    <TouchableOpacity onPress={() => setIsDirect(true)} style={{
                        backgroundColor: isDirect ? '#6B8E23' : '#a4a4a4',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 10
                    }}>
                        <Text>Direct Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDirect(false)} style={{
                        backgroundColor: isDirect ? '#a4a4a4' : '#6B8E23',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 10
                    }}>
                        <Text>Bid Status</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : 25 , marginBottom : 25}}>
                    <ActivityIndicator animating={animating}/>
                </View>
                {
                    isDirect ? (<FlatList data={CartItems} onRefresh={() => loadCartItems(profile)} refreshing={ false} renderItem={renderItem} keyExtractor={item => item.id} />) :
                        (<FlatList data={bidList} renderItem={bidRenderItem} keyExtractor={item => item.id} />)
                }
            </KeyboardAvoidingView>
        </View>
    )
    
}
    export default Cart

    const styles = StyleSheet.create({
        mainArea: {
            backgroundColor: "white",
            height: '100%',
        },
        buttonBar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        container: {
            justifyContent: 'flex-start',
        },
        container1: {
            justifyContent: 'flex-end',
        },
        item: {
            fontWeight: 'bold',
            fontSize: 18,
        },
        btn: {
            backgroundColor:'#6B8E23',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 120,
            borderRadius: 20,
            marginRight: 10,
        },
        btntxt: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14
        },
    
    })