import { StyleSheet, View,Image,Text,TouchableHighlight,TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect,useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ navigation , socket}) => {
    const [notification , setNotification] = useState([]);
    const [notify , setNotify] = useState(false);
    const [typw, setTypw] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("type", (error, result) => {
            if (error) {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            } else {
                setTypw(result);
            }
        })
    }, []);

    useEffect(() => {
        socket?.on('getNotification' , (data) => {
            setNotification((prev) => [...prev , data]);
            setNotify(true);
            notification?.map((n) => {
                console.log(n.senderName);
            })
        });
    } , [socket]);

  return (
    <View>
        <View style={styles.topContent}>
              <View style={styles.mainCont}>
                  <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                      <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                      </TouchableOpacity>
                  <View style={styles.htext}>
                      <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                          <Text style={styles.headerText}>Govi Saviya</Text>  
                          </TouchableOpacity>
                    </View>
                    
              </View>
        </View>
          <View style={styles.mainCont1}>
            <TouchableHighlight onPress={()=>navigation.openDrawer()} activeOpacity={0.2} underlayColor='#6B8E23'>
                  <FontAwesome name="navicon" size={30} />
                  
            </TouchableHighlight>
              <TouchableHighlight onPress={() => navigation.navigate("Interface")} activeOpacity={0.2} underlayColor='#6B8E23'>
             <FontAwesome name="home" size={30}  />
            </TouchableHighlight>
              
              {
                  typw != "customer"?(<TouchableHighlight onPress={()=>navigation.navigate("CreatePost")} activeOpacity={0.2} underlayColor='#6B8E23'>
                <FontAwesome name="plus-square" size={30} />
            </TouchableHighlight>):null
            }

              {
                  typw != "farmer" ? (<TouchableHighlight onPress={()=>navigation.navigate("Cart")} activeOpacity={0.2} underlayColor='#6B8E23'> 
                <FontAwesome name="cart-plus" size={30}  />
            </TouchableHighlight>):null
            }
            
            <TouchableHighlight onPress={()=>{setNotify(false); navigation.navigate("Notifications" , {notification: notification});}} activeOpacity={0.2} underlayColor='#6B8E23'>
                  {
                    notify ? (
                        <MaterialCommunityIcons name="bell-alert" size={28} color="red" />
                    ) : (
                        <FontAwesome name="bell" size={28} />
                    )
                  }
            </TouchableHighlight>
            
            <TouchableHighlight onPress={()=>navigation.navigate('Message')} activeOpacity={0.2} underlayColor='#6B8E23'>
                <FontAwesome name="comments" size={30}  />
            </TouchableHighlight>
            
          </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
    },
    headerText: {
        fontSize: 28,
        color: '#6B8E23',
        fontWeight: 'bold',
        fontFamily:'sans-serif-medium'
    },
    htext: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent:'center'
    },
    topContent:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    mainCont: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        paddingTop: 4, 
        
    },
    mainCont1: {
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingBottom:10
    },
    Input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius:10,
        marginHorizontal:10,
        marginBottom:8,
        borderColor: "green",  
        padding:8
    },
})