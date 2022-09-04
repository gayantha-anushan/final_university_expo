import { StyleSheet, Text, View ,Image,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native'
import React, { useEffect,useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import Connection, { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { Button, Dialog, ProgressBar } from 'react-native-paper';
import DialogReport from './DialogReport';
import UserContext from '../Context/UserContext';

const ViewProfile = ({ route,navigation }) => {
    const [image, setImage] = useState(null)
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [Address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [location, setLocation] = useState(null)
    const [point, setPoint] = useState(null)
    const [typew,setTypw]=useState(null)

    const { uid} = route.params
    
    const {userData} = React.useContext(UserContext);


    useEffect(() => {
        console.log("uid "+uid)
        if (uid == null) {
            AsyncStorage.getItem("auth_code", (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(result)
                    fetch(Connection.getConnection() + "/api/auth/profile-data", {
                        method: 'POST',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            token: result
                        })
                    }).then((response) => response.json()).then((responsejson) => {
                        console.log(responsejson);
                        setImage(getConnection() + "/profile/" + responsejson.data.image);
                        setName(responsejson.data.firstname + " " + responsejson.data.lastname)
                        setType(responsejson.data.type)
                        setAddress(responsejson.data.address);
                        setContact(responsejson.data.contact)
                        setLocation({
                            latitude: responsejson.data.latitude,
                            longitude: responsejson.data.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        })
                        setPoint({
                            latitude: responsejson.data.latitude,
                            longitude: responsejson.data.longitude
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            })
        } else {
            fetch(Connection.getConnection() + "/api/auth/get-profile/" + uid, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                }
            }).then((response) => response.json()).then((responsejson) => {
                console.log(responsejson);
                setImage(getConnection() + "/profile/" + responsejson.image);
                setName(responsejson.firstname + " " + responsejson.lastname)
                setType(responsejson.type)
                setAddress(responsejson.address);
                setContact(responsejson.contact)
                setLocation({
                    latitude: responsejson.latitude,
                    longitude: responsejson.longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0001
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [uid])

     useEffect(() => {
     AsyncStorage.getItem("type", (error, result) => {
         if (error) {
             ToastAndroid.show(error, ToastAndroid.SHORT);
         } else {
             setTypw(result);
         }
     })
         }, []);
    
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titlebar}>
                          <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                              <AntDesign name="arrowleft" size={30} color="black" />
                          </TouchableOpacity>
                    {
                        uid ? (<TouchableOpacity onPress={()=>navigation.navigate("Message")}>
                              <Image style={styles.icon1} source={require('../assets/chat.png')} />
                          </TouchableOpacity>) : null
                          }
                      </View>
                    <View style={styles.upcont}>
                        <View style={{alignSelf:"center"}}>
                            <View style={styles.profileimage}>
                            {
                                image ? (<Image source={{uri:image}} style={styles.image} resizeMode="cover"></Image>):null
                                }
                            </View>
                        </View>
                            <View style={styles.text}>
                                <Text style={styles.text}>{name}</Text>
                            </View>
                            <View style={styles.ButtonCont}>   
                            {
                                uid ? null:(<TouchableOpacity style={styles.touchable}  onPress={() => navigation.navigate("Profile", { state: "EDIT" })}>
                                    <Image style={styles.icon} source={require('../assets/writing.png')} />
                                    <Text style={styles.text3}>Edit Profile Details</Text>
                                    </TouchableOpacity>)
                            }
                            </View>  
                            <View style={styles.ButtonCont1}>
                            {
                                typew !="customer" && !uid ? (<TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate('ViewPost')}>
                               <Image style={styles.icon} source={require('../assets/products.png')} />
                               <Text style={styles.text3}>Your Products</Text>
                            </TouchableOpacity>):null
                            }
                            </View>
                    </View>
                <View>
                    {
                        uid ? (<DialogReport
                            reporteeId={uid}
                            reportorId={userData.user}
                        />):null
                    }
                    </View>
                    
                        <View style={styles.textset}>
                            <Image style={styles.icon1} source={require('../assets/user-1.png')} />
                            <Text style={styles.text1}>Postion As:</Text>
                            <Text style={styles.text2}>{ type}</Text>
                        </View>
                        <View style={styles.textset}>
                            <Image style={styles.icon1} source={require('../assets/home-address.png')} />
                            <Text style={styles.text1}>Address:</Text>
                    <Text style={styles.text2}>{ Address}</Text>
                        </View>     
                        <View style={styles.textset}>
                            <Image style={styles.icon1} source={require('../assets/phone-call.png')} />
                            <Text style={styles.text1}>Phone Number:</Text>
                    <Text style={styles.text2}>{contact}</Text>
                        </View>
                        <View style={styles.textset}>
                            <Image style={styles.icon1} source={require('../assets/location.png')} />
                            <Text style={styles.text1}>Location:</Text>
                        </View>
                    {
                        location ? (<MapView style={styles.map} initialRegion={location} onRegionChange={setLocation} >
                            {
                                point ? (<Marker coordinate={point} title="Your Location" description='Selected location that you added as your location'/>):null
                            }
                        </MapView>):null
                    } 
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
        backgroundColor: '#a9a9a9',
        borderRadius: 40,
        paddingTop: 10,
        padding: 15,
        margin:8
    },

    titlebar: {
        flexDirection: 'row',
        marginTop: 35,
        justifyContent: 'space-between',
        marginHorizontal: 15,
        paddingBottom:10
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
        color: '#6B8E23',
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
        paddingTop: 5,
        

    },
    ButtonCont1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        
    },
    map: {
        width:300,
        height: 150,
        alignSelf:'center'
    },
    icon: {
        tintColor:'white'
    },
    icon1: {
        tintColor:'black'
    }
})