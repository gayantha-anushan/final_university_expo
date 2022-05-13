import React,{useState,useEffect} from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList} from 'react-native';

import Post from '../components/Post';
import Header from '../components/Header';
import { getConnection } from '../Connection';

const Interface = ({navigation }) => {
    
    const renderItem = ({item}) => <Post username={item.username} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type}/>

    const [data, setData] = useState([
        {
            username:"gayantha",
            date:"2022/01/01"
        }
    ])

    useEffect(() => {
        //startup functions
        fetch(getConnection()+'/api/posts/',{
            method:'GET'
        }).then((response)=>response.json()).then((responseJson)=>{
            console.log(responseJson)
        })
    }, [])
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item._id} />
                {/* <ScrollView>
                    <Post username="Kasun" postdate="2022/05/05" title="Strawberry But Not for you" price="20.00" quantity="120" type="DIRECT"/>
                </ScrollView> */}
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