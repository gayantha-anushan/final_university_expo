import {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid , FlatList} from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import Connection  from '../Connection';
import DialogOrders from './DialogOrders';
import CompleteOrder from './CompleteOrder';
import { useEffect } from 'react';
import UserContext from '../Context/UserContext';
import Header from './Header';
import StockItem from './StockItem';


const Stock = ({navigation}) => {

    const renderItem = ({ item }) => <StockItem 
                                        navigation={navigation}
                                        title={item.title}
                                        date={item.date}
                                        qty={item.qty}
                                        itemColor={item.color}
                                        />

    const [stocks , setStocks] = React.useState([]);
    const [listRefreshing, setListRefreshing] = useState(false)

    React.useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            fetch(Connection.getConnection() + "/api/stock" , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'token': authCode,
                }
            }).then((result) => result.json()).then((jres) => {
                var array = [];
                jres.map(item => {
                    array = array.concat(item);
                })
                setStocks(array);
                console.log(jres);
            }).catch((error) => {
                console.log(error);
            })
        })
    } , []);

    const refresh = async () => {
        fetch(Connection.getConnection() + "/api/stock" , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            }
        }).then((result) => result.json()).then((jres) => {
            var array = [];
                jres.map(item => {
                    array = array.concat(item);
                })
                setStocks(array);
                console.log(jres);
        }).catch((error) => {
            console.log(error);
        })
    }

    const title = "Stock";

    return (
        <View style={styles.stockContainer}>
            <Header title={title} navigation={navigation} func={refresh} icon={'refresh'}/>
            {/* {
                stocks.map((stock) => {
                    return <StockItem 
                            navigation={navigation}
                            key={stock._id}
                            title={stock.title}
                            date={stock.date}
                            qty={stock.qty}
                            differenceInDays={stock.differenceInDays}
                            />
                })
            } */}
            <FlatList data={stocks} renderItem={renderItem} keyExtractor={item => item._id} />
        </View>
    )
}

const styles = StyleSheet.create({
    stockContainer : {
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

export default Stock;