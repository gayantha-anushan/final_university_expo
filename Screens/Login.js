import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import Connection from '../Connection'
import {TextInput} from 'react-native-paper'
import UserContext from '../Context/UserContext';
import * as WebBrowser from 'expo-web-browser';

const Login = ({ navigation }) => {

    

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    

    // context api
    const {setUserData} = React.useContext(UserContext);

    const loginNow = () => {
        //connection
        console.log(Connection.getConnection()+"/api/auth/login");
        if(email != "" && password != ""){
            fetch(Connection.getConnection()+"/api/auth/login",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                }),
            }).then((response) => response.json()).then(async (responseJson) => {
                console.log(responseJson)
                //response coming from derver
                if(responseJson.status == "OK"){
                    setUserData({
                        token : responseJson.token
                    });
                    await AsyncStorage.setItem('auth_code',responseJson.token);
                    navigateToSuitable(responseJson.token)
                }else{
                     ToastAndroid.show(responseJson.error,ToastAndroid.SHORT)
                }
            }).catch((error) => {
                //console.log("error: " +error)
                 console.log(error);
                ToastAndroid.show("Error Occured From Server", ToastAndroid.SHORT);
            })
        }else{
            ToastAndroid.show("cannot insert empty email and(or) password",ToastAndroid.SHORT);
        }
    }

    const openWebBrowser = async () => {
        await WebBrowser.openBrowserAsync("https://agro-support.herokuapp.com/forgotpassword")
    }

    const navigateToSuitable = (token) => {
        //this functon create to navigate for suitable directory
        //TODO1:Check Profile Availability
        //Todo2:route to suitab;e terfaces
        fetch(Connection.getConnection()+"/api/auth/profile-data",{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                token:token
            })
        })
        .then((response)=>response.json()).then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.status == "ERROR"){
                navigation.navigate('Profile',{
                    state:"NEW"
                })
            }else{
                AsyncStorage.setItem("current_profile", responseJson.data._id);
                AsyncStorage.setItem("type", responseJson.data.type);
                navigation.navigate('DrawerContainer')
            }
        }).catch((error) => {
            console.log(error)
            ToastAndroid.show("Error Occured!", ToastAndroid.SHORT);
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                <View style={styles.mainCont}>
                    <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                    <Text style={styles.headerText}>Govi Saviya</Text>
                    </View>
                         <ImageBackground style={styles.backImage} source={require('../assets/Login.png')}>
                        </ImageBackground> 
                        
                    <View style={styles.container}>
                        <TextInput value={email} onChangeText={setemail} style={styles.input} placeholder="Email" theme={{colors:{underlineColor:'transparent',primary:'#6B8E23'}}}/>
                        <TextInput value={password} onChangeText={setpassword} style={styles.input} placeholder="Password" secureTextEntry={passwordVisible} right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                            theme={{colors:{underlineColor:'transparent',primary:'#6B8E23'}}} />
                    </View> 
                    <View style={styles.ButtonCont}>
                        <TouchableOpacity style={styles.Touchable} onPress={()=>navigation.navigate('Home')}>
                                <Text style={styles.Text}>Cancel</Text>
                         </TouchableOpacity>
                        <TouchableOpacity style={styles.Touchable} onPress={() => loginNow()}>
                            <Text style={styles.Text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ButtonCont1}>
                        <Text style={styles.text3}>Don't have an Account?</Text>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Register')}>
                            <Text style={styles.text2}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ButtonCont1}>
                        <TouchableOpacity onPress={() => openWebBrowser()}>
                        <Text style={{color:'red',fontSize:18,fontWeight:'bold'}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        
        
    )
}
const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    },
    mainCont: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    logo: {
        width:90,
        height: 90,
        display: 'flex',
    },
    headerText: {
        fontSize: 32,
        color: '#6B8E23',
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent:'center'
        
    },
    backImage: {
        width:'100%',
        height: 250,
        justifyContent: "center",
        opacity: 0.8,
        paddingTop: 50,
    
    },
    Touchable: {
        backgroundColor: '#6B8E23',
        padding: 15,
        borderRadius: 20,
        paddingHorizontal: 40,  
    },
    Touchable1: {
        backgroundColor: '#4d8aeb',
        borderColor:'rgba(0,0,0,0.2)',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        flexDirection:'row'
        
    },
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 2,
        paddingTop:30
    },
    ButtonCont1: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent:'center'
        
        
    },
    input: {
        margin:10,
        borderWidth: 2,
        padding: 2,
        borderRadius: 15,
        justifyContent: "center",
        width: '90%',
        fontSize: 18,
        height: 60,
        backgroundColor:'white'
    
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'white'
    },
    Text1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:18
    },
    container: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        color: '#4d8aeb',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle:'italic'
    },
    text3: {
        color: 'black',
        fontSize: 18,
        fontWeight:'bold'
    }

    
});

export default Login;
