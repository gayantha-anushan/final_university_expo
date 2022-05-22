import { StyleSheet, Text, View ,Image,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native'
import React, { useEffect,useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import Connection, { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewProfile = ({ navigation }) => {
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [Address, setAddress] = useState("")
    const [contact, setContact] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("auth_code", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                fetch(Connection.getConnection() + "/api/auth/profile-data", {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        token:result
                    })
                }).then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson);
                    setImage(getConnection() + "/profile/" + responsejson.data.image);
                    setName(responsejson.data.firstname + " " + responsejson.data.lastname)
                    setType(responsejson.data.type)
                    setAddress(responsejson.data.address);
                    setContact(responsejson.data.contact)
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }, [])
    
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.upcont}>
                        <View style={styles.titlebar}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                                <AntDesign name="left" size={35} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate("Message")}>
                                <AntDesign name="message1" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:"center"}}>
                            <View style={styles.profileimage}>
                                <Image source={{uri:image}} style={styles.image} resizeMode="center"></Image>
                            </View>
                        </View>
                        <View style={styles.add}>  
                    </View>
                        <View style={styles.text}>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                    
                    </View>
                        <View style={styles.textset}>
                            <AntDesign name="user" size={25} color="black"></AntDesign>
                            <Text style={styles.text1}>Postion As:</Text>
                            <Text style={styles.text2}>Farmer</Text>
                        </View>
                        <View style={styles.textset}>
                            <AntDesign name="carryout" size={25} color="black"></AntDesign>
                            <Text style={styles.text1}>Worked At:</Text>
                            <Text style={styles.text2}>Amarasena Farmers</Text>
                        </View>
                        <View style={styles.textset}>
                            <AntDesign name="tags" size={25} color="black"></AntDesign>
                            <Text style={styles.text1}>Location:</Text>
                            <Text style={styles.text2}>NuwaraEliya</Text>
                        </View>
                        <View style={styles.textset}>
                            <AntDesign name="home" size={25} color="black"></AntDesign>
                            <Text style={styles.text1}>Address:</Text>
                    <Text style={styles.text2}>{ Address}</Text>
                        </View>     
                        <View style={styles.textset}>
                            <AntDesign name="phone" size={25} color="black"></AntDesign>
                            <Text style={styles.text1}>Phone Number:</Text>
                    <Text style={styles.text2}>{contact}</Text>
                        </View> 
                        <View style={styles.ButtonCont1}>
                            <TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate('ViewPost')}>
                                <AntDesign name="isv" size={25} color="blue"></AntDesign>
                            <Text style={styles.text3}>Your Post</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ButtonCont}>   
                            <TouchableOpacity style={styles.touchable}  onPress={() => navigation.navigate("Profile", { state: "EDIT" })}>
                                <AntDesign name="edit" size={25} color="blue"></AntDesign>
                                <Text style={styles.text3}>Edit Profile Details</Text>
                            </TouchableOpacity>
                        </View>
            </ScrollView>        
      </SafeAreaView>
  )
}

export default ViewProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upcont: {
        backgroundColor:'#48d1cc'
    },

    titlebar: {
        flexDirection: 'row',
        marginTop: 45,
        justifyContent: 'space-between',
        marginHorizontal:15
    },
    image: {
        flex:1,
        width: undefined,
        height: undefined,
        
    },
    add: {
        position: 'absolute',
        alignItems:'stretch'
        
    },
    profileimage: {
        overflow:'hidden',
        width: 200,
        height: 200,
        borderRadius: 80,
        color:"black"
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        textAlign:'center'
        
    },
    text1: {
        fontSize: 20,
        marginStart: 10,
        fontWeight: 'bold',
        color:'#008b8b'
    },
    text2: {
        fontSize: 20,
        color:"black"
    },
    text3: {
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
    },
    textset: {
        flexDirection: 'row',
        marginHorizontal: 25,
        paddingTop:25
    },
    touchable: {
        backgroundColor: '#cd5c5c',
        padding: 10,
        borderRadius: 20,
        paddingHorizontal: 40, 
        flexDirection: 'row',
        
        
    },
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 30,
        

    },
    ButtonCont1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 55,
        
    }
})