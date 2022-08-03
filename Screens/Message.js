import React, {useEffect,useState} from 'react';
import {Text,StyleSheet,View,FlatList, ToastAndroid, TouchableOpacity, Dimensions} from 'react-native'
import { TextInput,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header'
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConnectionViewer = ({ id,user,navigation }) => {
    
    const image = getConnection() + "/profile/" + user.image;
    
    useEffect(() => {
        console.log(image)
    }, [])
    

    return (
        <TouchableOpacity onPress={() => navigation.navigate("chatscreen", { id: id })} style={styles.chatItem}>
            <Image source={{ uri: image }} resizeMode="cover" style={styles.chatItemImage} />
            <View style={styles.chatItemContent}>
                <Text style={styles.chatItemUser}>{user.firstname} {user.lastname}</Text>
                <Text style={styles.chatItemType}>{user.type}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Message = ({ navigation }) => {

    const [myId, setMyId] = useState(null)
    
    const renderItem = ({ item }) => <ConnectionViewer navigation={navigation} id={item._id} user={ item.user._id == myId ? item.user2 : item.user} />

    useEffect(() => {
      //content goes here
        const unsubscribe = navigation.addListener('focus', () => {
            loadContent()
        })
    }, [])
    

    const loadContent = () => {
        AsyncStorage.getItem("current_profile", (error, result) => {
            if (error) {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            } else {
                setMyId(result)
                fetch(getConnection() + "/api/chat/connections/" + result, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type":"application/json"
                    }
                }).then((result) => result.json()).then((jsonResult) => {
                    //Implement Code Here!
                    setConnections(jsonResult)
                    console.log(jsonResult)
                })
            }
        })
    }
    
    const [connections, setConnections] = useState([])

    return (
        <View>
            <Header navigation={navigation}/>
            <FlatList renderItem={renderItem} data={connections} keyExtractor={item=>item._id} />
        </View>
    )
}
const styles = StyleSheet.create({
    chatItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderColor: '#aaaaaa',
        borderWidth: 1,
        borderRadius:40
    },
    chatItemContent: {
        paddingHorizontal: 10,
        width: Dimensions.get("window").width - 90,
    },
    chatItemImage: {
        height: 70,
        width: 70,
        borderRadius:35,
    },
    chatItemType: {

    },
    chatItemUser: {
        fontWeight: 'bold',
        fontSize:18
    }
});
export default Message;