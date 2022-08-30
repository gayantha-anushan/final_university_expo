import { Dimensions, FlatList, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect,useState} from 'react'
import { TouchableOpacity,Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import strawberry from '../assets/strawberry.jpg'
import background from '../assets/background-chat.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocketContext from '../Context/SocketContext';
import { getConnection } from '../Connection';
const IncomingMessage = ({message,time}) => {
    return (<View style={{
                      backgroundColor: "#aaaaaa",
                      margin: 8,
                      borderRadius: 10,
                      borderTopLeftRadius:0,
                      marginRight: "40%",
                      padding:8
                  }}>
                      {/*Incoming Messages */}
        <Text>{message}</Text>
        <Text>{time.slice(11,16)}</Text>
                  </View>)
}

const SentMessages = ({message,time,status}) => {

    return (<View style={{
                      backgroundColor: "#6B8E23",
                      borderRadius: 10,
                      padding: 8,
                      margin: 8,
                      marginLeft: "40%",
                      borderBottomRightRadius:0
                   }}>
                      {/* Outgoing messages */}
        <Text style={{
            color: "#ffffff",
            fontSize:16
        }}>{message}</Text>
        <View style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection:"row"
        }}>
            <Text style={{
                color: "#ECECEC",
                fontSize: 12,
                marginRight:5
            }} >{time.slice(11,16)}</Text>
        { status == "sent" ? (<Ionicons name="ios-checkmark" size={14} color="#ececec" />):null }
        {status == "delivered" ? (<Ionicons name="ios-checkmark-done" size={14} color="#ececec" />):null }
        </View>
                    </View>)
}

const ChatScreen = ({ route, navigation }) => {


    const { socketData } = useContext(SocketContext)
    const [onlineStatus, setOnlineStatus] = useState("Offline")
    const [messageSet, setMessageSet] = useState([]);
    const [reference, setReference] = useState(null)
    const [user, setUser] = useState(null)
    const { id } = route.params
    const [connectionData, setConnectionData] = useState(null)
    //const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState("")
    const [otherUser, setOtherUser] = useState(null)
    
    const renderitem = ({ item }) => {
        if (item.sender == user) {
            return (<SentMessages message={item.message} time={item.time} status={item.status} />)
        } else {
            return (<IncomingMessage message={item.message} time={item.time} />)
        }
    }

    useEffect(() => {
        //setSocket(io(getConnection()))
        console.log("connected ex")
        AsyncStorage.getItem("current_profile", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                setUser(result)
            }
        })
        // navigation.addListener("focus", () => {
            
        // })

    }, [])
    
    useEffect(() => {
        if (id != null && id != undefined) {
            console.log(id)
            socketData.emit("newChat", id)
            socketData.on("initData", (data) => {
                setConnectionData(data.connectionData)
                setMessageSet(data.last_10.reverse())
            })
        }
    }, [id])
    

    useEffect(() => {
        if (connectionData != null) {
          socketData.on("incomingMessages", (data) => {
                console.log(connectionData)
                console.log("Hooo "+data.data.connection.toString().localeCompare(connectionData._id.toString()))
                if (data.data.connection.toString().localeCompare(connectionData._id.toString()) == 0) {
                    var msg = messageSet;
                    msg = msg.concat(data.data)
                    //imessages = msg
                    console.log("its me 0000000000000000000000000000000000000000000000000")
                    setMessageSet(msg);
                    if (data.status == true) {
                        setOnlineStatus("Online")
                    } else {
                        setOnlineStatus("Offline")
                    }
                    reference.scrollToEnd({animated:true})
                }
            })
      }
    }, [connectionData,messageSet])
    

    useEffect(() => {
        if (user != null && connectionData != null) {
            if (connectionData.user._id == user) {
                setOtherUser(connectionData.user2)
            } else {
                setOtherUser(connectionData.user);
            }
        }
    }, [connectionData,user])
    

    const sendNewMessage = () => {
        var mg = {
            sender: user,
            connection:connectionData._id,
            message: message,
            time: new Date().toISOString(),
            status:"sent"
        }
        socketData.emit("newMessage", mg);
        setMessage("")
    }
    
    

  return (
      <KeyboardAvoidingView>
          <View style={{
              height:"100%"
          }}>
          {/* Header Component */}
          <View style={styles.header}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()} style={styles.headerNav}>
                  <EvilIcons name="navicon" size={30} color="black" />
              </TouchableOpacity>
                  {otherUser != null ? (<Image source={{uri:getConnection()+"/profile/"+otherUser.image}} style={styles.headerImage} />):null }
                  {otherUser != null ? (<View style={styles.headerContent}>
                      <Text style={styles.headerTitle}>{otherUser.firstname + " "+otherUser.lastname}</Text>
                      <Text style={styles.headerStatus}>{onlineStatus}</Text>
                  </View>) : null}
          </View>
          {/* Messages List */}
          <ImageBackground source={background} style={styles.imageBackgroundStyles}>
                  <FlatList data={messageSet} ref={(ref)=>{ setReference(ref)}} renderItem={renderitem} keyExtractor={item => item._id} style={{
                      marginBottom:160
                  }} />
              <View style={styles.typeWriter}>
                      <TextInput value={message} onChangeText={setMessage} multiline={true} style={styles.typeWriterInput} placeholder='type message here' />
                  <TouchableOpacity onPress={()=>sendNewMessage()} style={styles.typeWriterButton}>
                    <Ionicons name="md-send-sharp" size={26} color="#6B8E23" />
                </TouchableOpacity>
            </View>
          </ImageBackground>
    </View>
      </KeyboardAvoidingView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 5,
        backgroundColor: '#6B8E23',
        paddingHorizontal: 5
    },
    typeWriterButton: {
        padding: 3,
        margin:2
    },
    typeWriterInput: {
        width: Dimensions.get('window').width - 60,
        padding: 4,
        fontSize:18
    },
    imageBackgroundStyles: {
        width: '100%',
        height:"100%"
    },
    chatScreenView: {
        //height:Dimensions.get("screen").height - 200
    },
    typeWriter: {
        margin: 4,
        padding: 4,
        borderRadius: 10,
        position: "absolute",
        bottom: 100,
        backgroundColor:'#f5deb3',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems:'center'
    },
    headerImage: {
        height: 50,
        width: 50,
        borderRadius:25
    },
    headerNav: {
        padding: 5,
        margin:5
    },
    headerContent: {
        paddingHorizontal:5
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize:18
    },
    contentContainer: {},
    textContainer:{}
})