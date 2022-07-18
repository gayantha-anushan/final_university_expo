import { StyleSheet, View, KeyboardAvoidingView, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { List } from 'react-native-paper';
import UserContext from '../Context/UserContext';
import { getConnection } from '../Connection';
import Notification from './Notification';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';


const Notifications = ({navigation , route}) => {


    const {userData} = React.useContext(UserContext);
    const [notifications , setNotifications] = React.useState([]);
    const [animating , setAnimating] = React.useState(true);


    React.useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            setAnimating(true);
            fetch(getConnection() + "/api/cart/getnotifications/" + userData.user, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then((response) => response.json()).then((jsonResult) => {
                var datas = []
                for (var i = jsonResult.length-1; i >= 0 ; i--){
                    datas = datas.concat({
                        _id : jsonResult[i]._id,
                        buyerFirstName : jsonResult[i].buyerId.firstname,
                        buyerLastName : jsonResult[i].buyerId.lastname,
                        date : jsonResult[i].date,
                        sellerId : jsonResult[i].sellerId,
                        transactionType : jsonResult[i].transactionType,
                    });
                }
                setNotifications(datas);
                console.log(jsonResult);
                setAnimating(false);
            })
        })
        console.log("USe Effext Called");
    }, []);





    return (
        <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation}/>
            <View style={{marginTop : 25 , marginBottom : 25}}>
                            <ActivityIndicator animating={animating}/>
            </View>
            <ScrollView>
            {

                notifications.map(notification => {
                    return <Notification 
                            key={notification._id}
                            id={notification._id}
                            firstName={notification.buyerFirstName}
                            lastName={notification.buyerLastName}
                            date={notification.date}
                            transactionType={notification.transactionType}
                            notifications={notifications}
                            setNotifications={setNotifications}
                            />
                })
                
            }
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    },
    card:{
        borderColor:'#000000',
        borderRadius:10,
        borderWidth:1,
        margin:5,
    },
    container1:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    container2:{
        alignItems:'center'
    },
    userImage:{
        height:50,
        width:50,
        margin:5,
        borderRadius:25,        
    },
    user:{
        fontWeight:'bold',
        fontSize:20,
    },
    btn:{
        backgroundColor:'green',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:150,
        borderRadius:20,
        marginBottom:5
    },
    btntxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    txt:{
        padding:7,
    }
})
  

