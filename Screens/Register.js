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
            try{
            fetch(Connection.getConnection()+"/api/auth/signup",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                }),
            })
            .then((response)=>response.json()).then(async (responseJson)=>{
                //response coming from server
                if(responseJson.status == "OK"){
                    await AsyncStorage.setItem('auth_code',responseJson.token);
                    navigation.navigate('Profile',{
                        state:"NEW"
                    })
                }else{
                    ToastAndroid.show(responseJson.error)
                }
            })
            }catch(error){
                console.log(error)
            }
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
                        <View style={styles.htext}>
                            <Text style={styles.headerText}>Vege Sup</Text>
                        </View>
                    </View>
                        <ImageBackground style={styles.backImage} source={require('../assets/Register.png')}>
                        </ImageBackground>
                    <View style={styles.container}>
                        
                            <TextInput value={email} onChangeText={setemail}  style={styles.input} placeholder="Email"  /> 
                            <TextInput value={password} onChangeText={setpassword} style={styles.input} placeholder="Password" secureTextEntry={true} />
                            <TextInput value={ReTypepassword} onChangeText={Resetpassword}  style={styles.input} placeholder="ReType-Password" secureTextEntry={true} />
                        
                       </View> 
                    <View style={styles.ButtonCont}>
                        <TouchableOpacity style={styles.Touchable} onPress={()=>registerNow()}>
                            <Text style={styles.Text}>Register For New Account</Text>
                        </TouchableOpacity>      
                    </View>
                    <View style={styles.ButtonCont1}>
                        <Text style={styles.text3}>Have an Account?</Text>
                        <TouchableOpacity  onPress={()=>navigation.navigate('Login')}>
                            <Text style={styles.text2}>Sign In</Text>
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
        fontSize: 30,
        color: '#6B8E23',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent:'center',
        
    },
    htext: {
        justifyContent:'center'
    },
    backImage: {
        width:380,
        height: 250,
        justifyContent: 'center',
    },
    Touchable: {
        backgroundColor: '#6B8E23',
        padding: 15,
        borderRadius: 20,
        paddingHorizontal: 60,  
    },
    Touchable1: {
        backgroundColor: '#4d8aeb',
        borderColor:'rgba(0,0,0,0.2)',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        flexDirection:'row'
    },
    Touchable2: {
        backgroundColor: '#6B8E23',
        padding: 15,
        borderRadius: 20,
        paddingHorizontal: 40,  
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
        paddingTop: 10,  
        justifyContent:'center'
    },
    input: {
        margin: 10,
        marginHorizontal:5,
        borderWidth: 2,
        padding: 13,
        borderRadius: 20,
        borderColor: '#696969',
        justifyContent: "center",
        width: 375,
        fontSize:18
    
    },
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    Text1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:18
    },
    text2: {
        color: '#4d8aeb',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    text3: {
        color: 'black',
        fontSize: 18,
        fontWeight:'bold'
}


    
});

export default Register;
