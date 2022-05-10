import React,{useState,useEffect} from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard, FlatList} from 'react-native';

import Post from '../components/Post';
import Header from '../components/Header';

const Interface = ({navigation }) => {
    
    const renderItem = ({post}) => <Post username={post.username} postdate={post.date} title={post.title} price={post.price} quantity={post.quantity} type={post.type}/>

    const [data, setData] = useState([])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item._id} />
                {/* <ScrollView>
                    
                    <Post username="Kasun" postdate="2022/05/05" title="Strawberry But Not for you" price="20.00" quantity="120" type="DIRECT"/>
                </ScrollView> */}
             </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    }
});
export default Interface;