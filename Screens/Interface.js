
import React,{useContext,useState,useEffect} from 'react';
import SocketContext from '../Context/SocketContext';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList, ToastAndroid,TouchableOpacity,TextInput} from 'react-native';


import Post from '../components/Post';
import Header from '../components/Header';
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../Context/UserContext';
import MessagesContext from '../Context/MessagesContext';
import { io } from "socket.io-client";
import { AntDesign } from '@expo/vector-icons';

const Interface = ({ route, navigation }) => {
    
    const { setSocketData } = useContext(SocketContext)
    const { setMessagesData } = useContext(MessagesContext)

    const renderItem = ({ item }) => <Post authType={item.authType} socket={socket} postid={item.postid} incompleted={item.incompleted} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    // const renderItem = ({ item }) => <Post  postid={item.postid} authimg={item.authimg} navigation={navigation} username={item.username} authid={item.authid} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false);
    const [term, setterm] = useState("");
    const [err, seterr] = useState([]);


    // for socket
    const {userData , setUserData} = React.useContext(UserContext);
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
                    loaddata(result);
                    AsyncStorage.getItem("current_profile", (error, resultx) => {
                        if (error) {
                            ToastAndroid.show(error,ToastAndroid.SHORT)
                        } else {
                            setUserData({
                                type:result,
                                user : resultx
                            });

                        }
                    })
                }
            })
            
        });
    }, []);

    const loaddata = (type) => {
        setListRefreshing(true)
        console.log(userData)
        //Loading Data
        fetch(getConnection()+'/api/posts/'+type,{
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
                        price = responseJson[i].price.customer
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
                    authid: responseJson[i].author._id,
                    authType: responseJson[i].author.type,
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
            setfiltereddata(datas)
            //console.log(datas)
        })
        setListRefreshing(false)
    }
    const [filtereddata, setfiltereddata] = useState([]);

    const searchHandler = () => {
        //data
        let newData = data.filter(item => {
            const name = item.title.toUpperCase();
            const termnew = term.toUpperCase();
            if (termnew.length == 0) {
                return true;
            } else {
                return name.indexOf(termnew) > -1;
            }
        })
        setfiltereddata(newData);
        //filter data
    }
    
 
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation} socket={socket} />
            <View style={styles.search}>
                <TextInput style={styles.Input} placeholder='Search here......' value={term} onChangeText={(newText) => {
                    setterm(newText);
                }} />
                {
                    term !== "" ? (<TouchableOpacity style={styles.Touchable} onPress={()=>setterm("")}>
                    <AntDesign name="closecircleo" size={36} color="green" />
                </TouchableOpacity>):null
                }
                <TouchableOpacity style={styles.Touchable} onPress={()=>searchHandler()}>
                    <AntDesign name="search1" color="green" size={36} />
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList refreshing={listRefreshing} onRefresh={() => loaddata(userData.type)} data={filtereddata} renderItem={renderItem} keyExtractor={item => item.key} />
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
        borderWidth: 2,
        borderRadius: 30,
        borderColor: "green",
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        flex: 1,
        marginLeft: 8,
        fontSize: 18,
        fontWeight:'bold',
    },
    Touchable: {
        padding:7
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Interface;