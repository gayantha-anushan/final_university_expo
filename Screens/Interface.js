import React,{useContext,useState,useEffect} from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList, ToastAndroid} from 'react-native';
import SocketContext from '../Context/SocketContext';
import Post from '../components/Post';
import Header from '../components/Header';
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../Context/UserContext';
import MessagesContext from '../Context/MessagesContext';
import { io } from "socket.io-client";

const Interface = ({ route, navigation }) => {
    
    const { setSocketData } = useContext(SocketContext)
    const { setMessagesData } = useContext(MessagesContext)

    const renderItem = ({ item }) => <Post socket={socket} postid={item.postid} incompleted={item.incompleted} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    // const renderItem = ({ item }) => <Post  postid={item.postid} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false);


    // for socket
    const {userData} = React.useContext(UserContext);
    const [socket, setSocket] = React.useState(null);


    React.useEffect(() => {
        // setSocket(io("http://192.168.1.4:3001"));
        setSocket(io(getConnection()));
    } , []);


    React.useEffect(() => {
        socket?.emit('newUser', userData.user);
        if (socket != null) {
            setSocketData(socket)
            AsyncStorage.getItem("current_profile", (error, result) => {
                if (error) {
                    ToastAndroid.show(error, ToastAndroid.SHORT);
                } else {
                    fetch(getConnection() + "/api/chat/connections/" + result, {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type":"application/json"
                        }
                    }).then((result) => result.json()).then((jsonResult) => {
                        //Implement Code Here!
                        setMessagesData(jsonResult)
                    })
                }
            })
        }
      } , [socket , userData]);


    useEffect(() => {
        //startup functions
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem("type", (error, result) => {
                if (error) {
                    ToastAndroid.show(error,ToastAndroid.SHORT)
                } else {
                    loaddata(result)
                }
            })
        });
    }, []);

    

    const loaddata = (type) => {
        setListRefreshing(true)
        //Loading Data
        fetch(getConnection()+'/api/posts/',{
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
                datas.push({
                    key:responseJson[i]._id,
                    authimg: responseJson[i].author.image,
                    postid:responseJson[i]._id,
                    authid:responseJson[i].author._id,
                    username:responseJson[i].author.firstname + " "+responseJson[i].author.lastname,
                    date:responseJson[i].date,
                    title:responseJson[i].title,
                    price: price,
                    incompleted: responseJson[i].incompletedQuantity,
                    quantity: responseJson[i].quantity - responseJson[i].successQuantity,
                    type:responseJson[i].type,
                    image:getConnection()+"/post-img/"+responseJson[i].image
                })
            }
            setData(datas)
        })
        setListRefreshing(false)
    }
    
 
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation} socket={socket}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList refreshing={listRefreshing} onRefresh={() => loaddata()} data={data} renderItem={renderItem} keyExtractor={item => item.key} />
                
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    }
});
export default Interface;