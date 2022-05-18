import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,TouchableWithoutFeedback,FlatList,Keyboard } from 'react-native'
import React,{useState,useEffect} from 'react'
import strawberry from '../assets/strawberry.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Post from './Post';

const ViewPost = ({username,postdate,title,quantity,price,type,image,navigation}) => {

    const [typeName, setTypeName] = useState("")
    const [isDirect, setIsDirect] = useState(false)
    const renderItem = ({ item }) => <Post username={item.username} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />

    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false)
    useEffect(() => {
        console.log("called")
        loaddata()
    }, [])

    const loaddata = () => {
        setListRefreshing(true)    
        AsyncStorage.getItem("current_profile", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                fetch(getConnection() + '/api/posts/' + result, {
                    method: 'GET'
                }).then((response) => response.json()).then((responseJson) => {
                    var datas = []
                    for (var i = 0; i < responseJson.length; i++) {
                        datas.push({
                            username: responseJson[i].author.firstname + " " + responseJson[i].author.lastname,
                            date: responseJson[i].date,
                            title: responseJson[i].title,
                            price: responseJson[i].price.customer,
                            quantity: responseJson[i].quantity,
                            image: getConnection() + "/post-img/" + responseJson[i].image
                        })
                    }
                    setData(datas)
                })
            }
        });
    setListRefreshing(false)
            
}
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <View>
                <Text style={styles.user}>Your Post</Text>
            </View>
            <View style={styles.mainCont}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList refreshing={listRefreshing} onRefresh={()=>loaddata()} data={data} renderItem={renderItem} keyExtractor={item => item._id} />
           
                </TouchableWithoutFeedback>
            </View>
            
            </KeyboardAvoidingView>
  )
}
export default ViewPost

const styles = StyleSheet.create({
    mainCont: {
        paddingTop:10
    },
    user:{
        fontWeight: 'bold',
        paddingTop: 50,
        alignItems: 'center',
        fontSize:20,
        flexDirection:'row'    
    },
})