import React,{useState,useEffect} from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList, ToastAndroid,TouchableOpacity,TextInput} from 'react-native';

import Post from '../components/Post';
import Header from '../components/Header';
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../Context/UserContext';
import { io } from "socket.io-client";
import { AntDesign } from '@expo/vector-icons';

const Interface = ({ route, navigation }) => {
    
    const renderItem = ({ item }) => <Post socket={socket} postid={item.postid} incompleted={item.incompleted} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    // const renderItem = ({ item }) => <Post  postid={item.postid} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false);


    // for socket
    const {userData} = React.useContext(UserContext);
    const [socket, setSocket] = React.useState(null);


    React.useEffect(() => {
        // setSocket(io("http://192.168.1.4:3001"));
        setSocket(io("http://192.168.43.201:3001"));
    } , []);


    React.useEffect(() => {
        socket?.emit('newUser', userData.user);
      } , [socket , userData]);


    useEffect(() => {
        //startup functions
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("parameters : "+ route.params)
            AsyncStorage.getItem("type", (error, result) => {
                if (error) {
                    ToastAndroid.show(error,ToastAndroid.SHORT)
                } else {
                    loaddata(result)
                }
            })
        });
    }, []);

    const [searchComponent, setSearchComponent] = useState(false)
    const [keywords, setKeywords] = useState("")

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
                //console.log(responseJson[i]);
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
            console.log(datas)
        })
        setListRefreshing(false)
    }
    
 
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation} socket={socket} />
            <View>
                <TouchableOpacity style={styles.Touchable}>
                    <AntDesign name="search1"  onPress={()=>setSearchComponent(!searchComponent)} color="black" size={32} />
                </TouchableOpacity>
                {
                    searchComponent ? (<TextInput style={styles.Input} placeholder='Search here......' value={keywords} onChangeText={setKeywords} />) : null
                }
            </View>
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
    },
    Input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 8,
        borderColor: "green",
        padding: 8
    },
    Touchable:{
        marginStart:340
    },
});
export default Interface;