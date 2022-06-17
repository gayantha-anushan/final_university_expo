import React , {useEffect, useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import Order from './Order';
import Header from './Header';
import { useTheme } from 'react-native-paper';
import Bid from '../components/Bid';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection, { getConnection }  from '../Connection';
import { FlatList } from 'react-native-gesture-handler';


const Orders = ({navigation}) => {

    const title = "Orders";
    const { colors } = useTheme();
    const [isOrder, setIsOrder] = useState(true)
    const [authCode , setAuthCode] = useState(null);
    const [orders, setOrders] = useState([]);
    const [bidData, setBidData] = useState([])

    const getOrders = (result,token) => {
        fetch(Connection.getConnection() + "/api/cart/seller/" + result, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token,
            }
        }).then((result) => result.json()).then((jres) => {
            var array = [];
            jres.map(item => {
                array = array.concat(item);
            })
            setOrders(array);
        }).catch((error) => {
            console.log("Error 1 : "+error);
        })
    }

    useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('auth_code', (error, result) => {
                if (error) {
                    console.log("Error 2 : "+error)
                } else {
                    setAuthCode(result)
                     AsyncStorage.getItem("current_profile", (error, result2) => {
                        if (error) {
                            console.log(error)
                        } else {
                            getOrders(result2,result);
                            loadBidData(result2,result)
                        }
                    })
                }
            })
        })

    }, []);
    
    const loadBidData = (id,token) => {
        fetch(Connection.getConnection() + "/api/auction/find-bidded-posts/" + id, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token":token
            }
        }).then((result) => result.json()).then((jsonResult) => {
            var bidDatai = [];
            for (var i = 0; i < jsonResult.length; i++){
                var dt = {
                    title: jsonResult[i].post.title,
                    image: getConnection() + "/post-img/" + jsonResult[i].post.image,
                    bids: jsonResult[i].bids,
                    id: jsonResult[i].post._id,
                    date:jsonResult[i].post.date.substring(0,11)
                }
                bidDatai = bidDatai.concat(dt);
            }
            setBidData(bidDatai);
        }).catch((error) => {
            console.log(error);
        })
    }

    const renderItem = ({ item }) => <Bid bids={item.bids} posttitle={item.title} navigation={navigation} postid={item.id} postdate={item.date} image={item.image} />

    return (
        <View style={styles.ordersContainer}>
            <Header title={title} navigation={navigation} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={()=>setIsOrder(true)} style={{
                    width: '50%',
                    padding: 15,
                    backgroundColor:isOrder ? '#6B8E23':'#a4a4a4'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color:isOrder ? '#fff':'#000'
                    }}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsOrder(false)} style={{
                    width: '50%',
                    padding: 15,
                    backgroundColor:isOrder ? '#a4a4a4':'#6B8E23'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color:isOrder ? '#000':'#fff'
                    }}>Bids</Text>
                </TouchableOpacity>
            </View>
            {
                isOrder ? (
                    <ScrollView>
                        {
                            // orders.map(order => {
                            //     order.postId ?  (   
                            //         <Order />
                            //     ) : null
                            // })
                            orders.map(order => {
                                return <Order 
                                        key={order._id}
                                        index={order._id}
                                        isApproved={order.isApproved}
                                        buyerId={order.buyerId} 
                                        price={order.price} 
                                        qty={order.qty}
                                        navigation={navigation}
                                        orders={orders}
                                        setOrders={setOrders}
                                        />
                            })
                        }
                        {/* <Order /> */}
                    </ScrollView>
                ) : (
                        <View>
                            <FlatList data={bidData} renderItem={renderItem} keyExtractor={item=>item.id} />
                    </View>
                )
            }
        </View>
    ) 
}

const styles = StyleSheet.create({
    ordersContainer : {
        height :'100%'
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#a4a4a4'
    }
})

export default Orders;