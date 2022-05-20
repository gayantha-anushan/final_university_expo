import React,{useState,useEffect} from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList} from 'react-native';

import Post from '../components/Post';
import Header from '../components/Header';
import { getConnection } from '../Connection';

const Interface = ({navigation }) => {
    
    const renderItem = ({ item }) => <Post username={item.username} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />
    

    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false)

    useEffect(() => {
        //startup functions
        loaddata()
    }, [])

    const loaddata = () => {
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
            //setData(responseJson)
            console.log(responseJson)
            var datas = []
            for(var i = 0 ; i < responseJson.length ; i++){
                datas.push({
                    username:responseJson[i].author.firstname + " "+responseJson[i].author.lastname,
                    date:responseJson[i].date,
                    title:responseJson[i].title,
                    price:responseJson[i].price.customer,
                    quantity:responseJson[i].quantity,
                    image:getConnection()+"/post-img/"+responseJson[i].image
                })
            }
            setData(datas)
        })
        setListRefreshing(false)
    }
    
 
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList refreshing={listRefreshing} onRefresh={() => loaddata()} data={data} renderItem={renderItem} keyExtractor={item => item._id} />
                
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