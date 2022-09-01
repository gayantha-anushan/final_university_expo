import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import Connection from '../Connection'
import {TextInput} from 'react-native-paper'
import UserContext from '../Context/UserContext';

const ForgotPassword = () => {

    const [email , setEmail] = useState('');
    const [text , setText] = useState('');

    fetch(Connection.getConnection()+"/api/auth/forgotpassword/:id",{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            email:email,
        }),
    }).then((response) => response.json()).then(async (responseJson) => {
        setText('One Time Link Send to the Your Email');
    }).catch((error) => {
        console.log('Mount');
    })

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
                <Text style={styles.headerText1}>Enter Your Email !</Text>
                <View style={styles.container}>
                    <TextInput value={email} onChangeText={setEmail}  style={styles.input} placeholder="Email" theme={{colors:{underlineColor:'transparent',primary:'#6B8E23'}}}/>
                </View> 
                <View style={styles.ButtonCont}>
                    <TouchableOpacity style={styles.Touchable} onPress={() => console.log(email)}>
                            <Text style={styles.Text}>Submit</Text>
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
    headerText1: {
        fontSize: 32,
        color: 'red',
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

export default ForgotPassword;