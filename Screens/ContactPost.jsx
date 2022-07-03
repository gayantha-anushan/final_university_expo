import React,{useState,useEffect} from 'react';
import { View,Text ,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList, ToastAndroid} from 'react-native';

import Post from '../components/Post';
import Header from './Header';
import Connection  from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
// import Post from '../components/Post'

const ContactPost = ({navigation , route}) => {

    const renderItem = ({ item }) => <Post postid={ item.postid} authimg={ item.authimg} navigation={navigation}  username={item.username} authid={ item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />

    const title = 'Posts';

    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false);
    const [type , setType] = useState();

    useEffect(() => {
        //startup functions
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem("type", (error, result) => {
                if (error) {
                    ToastAndroid.show(error,ToastAndroid.SHORT)
                } else {
                    setData([]);
                    setType(result);
                }
            })
        })
    }, []);


    const loaddata = async () => { 
        setListRefreshing(true)
        //Loading Data
        fetch(Connection.getConnection()+'/api/posts/'+route.params.id,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Cache-Control':'no-cache',
            }
        }).then((response)=>response.json()).then((responseJson)=>{
            var datas = []
            for (var i = 0; i < responseJson.length; i++){
                var price = 0;
                switch (type) {
                    case "farmer":
                        price = responseJson[i].price.wholeseller
                        break;
                    case "wholeseller":
                        price = responseJson[i].price.wholeseller
                        break;
                    case "localseller":
                        price = responseJson[i].price.localseller
                        break;
                    case "customer":
                        price = responseJson[i].price.customer
                        break;
                    default:
                        price = responseJson[i].price.customer
                }
                //console.log(responseJson[i]);
                datas.push({
                    key:responseJson[i]._id,
                    authimg: responseJson[i].author.image,
                    postid:responseJson[i]._id,
                    authid:responseJson[i].author._id,
                    username:responseJson[i].author.firstname + " "+responseJson[i].author.lastname,
                    date:responseJson[i].date,
                    title:responseJson[i].title,
                    price:price,
                    quantity: responseJson[i].quantity,
                    type:responseJson[i].type,
                    image:Connection.getConnection()+"/post-img/"+responseJson[i].image
                })
            }
            setData(datas)
        })
        setListRefreshing(false)
    }

    return (
        <View>
            <Header title={title} navigation={navigation} />
            <Button icon="refresh" mode="contained" onPress={loaddata}>
                See All Posts
            </Button>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {
                    data ? <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.key} /> : <View></View> 
                }              
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ContactPost;