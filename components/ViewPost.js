import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,TouchableWithoutFeedback,FlatList,Keyboard } from 'react-native'
import React,{useState,useEffect} from 'react'
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyPost from './MyPost'
import { AntDesign } from '@expo/vector-icons';

const ViewPost = ({username,postdate,title,quantity,price,type,image,navigation}) => {

    //const [typeName, setTypeName] = useState("")
    //const [isDirect, setIsDirect] = useState(false)
    const renderItem = ({ item }) => <MyPost username={item.username} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />

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
            <View style={styles.maincont}>
                <TouchableOpacity onPress={()=>navigation.navigate("ViewProfile",{uid:null})}>
                    <AntDesign name="left" size={30} color="black"></AntDesign>
                </TouchableOpacity>

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
    user:{
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize:20,
        flexDirection:'row'    
    },
    tab: {
        paddingTop: 5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#40e0d0',
        justifyContent:'flex-start'
        
    },
    maincont: {
        paddingTop: 40,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#40e0d0',
        justifyContent: 'space-between'
    },
    mainCont: {
        paddingTop:10
    }
})