import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import Connection from '../Connection'

const Register = ({ navigation }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [ReTypepassword, Resetpassword] =useState('');

    const registerNow = () => {
        //Registration process goes here
        if(email != "" && password != "" && password == ReTypepassword){
            fetch(Connection.getConnection()+"/api/auth/new-usr",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    uemail:email,
                    upass:password
                }),
            }).then((response)=>response.json()).then(async (responseJson)=>{
                //response coming from derver
                if(responseJson.status == "OK"){
                    await AsyncStorage.setItem('auth_code',responseJson.token);
                    navigation.navigate('Profile')
                }else{
                    ToastAndroid.show(responseJson.error.message)
                }
            })
        }else{
            ToastAndroid.show("Error Occured Here!",ToastAndroid.SHORT);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                <View style={styles.mainCont}>
                    <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                    <Text style={styles.headerText}>Register</Text>
                    </View>
                    <View style={styles.container}>
                        <ImageBackground style={styles.backImage} source={require('../assets/Register.png')}>
                            <TextInput value={email} onChangeText={setemail}  style={styles.input} placeholder="Email"  /> 
                            <TextInput value={password} onChangeText={setpassword} style={styles.input} placeholder="Password" />
                            <TextInput value={ReTypepassword} onChangeText={Resetpassword}  style={styles.input} placeholder="ReType-Password" />
                        </ImageBackground>
                       </View> 
                    <View style={styles.ButtonCont}>
                        <TouchableOpacity style={styles.Touchable} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.Text}>Login</Text>
                         </TouchableOpacity>
                        <TouchableOpacity style={styles.Touchable} onPress={()=>registerNow()}>
                <Text style={styles.Text}>Register</Text>
                        </TouchableOpacity>      
                    </View>
                    <View style={styles.ButtonCont1}>
                            <TouchableOpacity style={styles.Touchable1}>
                                <AntDesign name="google" size={26} color="white"/>
                                <Text style={styles.Text1}>Sign in with Google</Text>
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
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
        width:120,
        height: 120,
        
        display: 'flex',
    },
    headerText: {
        fontSize: 36,
        color: '#46e85b',
        fontWeight: 'bold',
        marginLeft: 50,
        paddingTop: 20,
        
    },
    backImage: {
        width:450,
        height: 550,
        justifyContent: 'center',
    },
    Touchable: {
        backgroundColor: '#59E64C',
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
        paddingTop:2

    },
    ButtonCont1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,   
    },
    input: {
        margin: 30,
        marginHorizontal:5,
        borderWidth: 2,
        padding: 13,
        borderRadius: 20,
        borderColor: '#696969',
        justifyContent: "center",
        width:375
    
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
        
        

    }

    
});

export default Register;
