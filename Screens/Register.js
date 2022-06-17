import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import Connection from '../Connection'
import {TextInput} from 'react-native-paper'
import UserContext from '../Context/UserContext';

const Register = ({ navigation }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [ReTypepassword, Resetpassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [RepasswordVisible, ResetPasswordVisible] = useState(true);

    // context api
    const {setUserData} = React.useContext(UserContext);

    const registerNow = () => {
        //Registration process goes here
        if (email != "" && password != "") {
            if (password == ReTypepassword) {
                fetch(Connection.getConnection() + "/api/auth/signup", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                })
                .then((response) => response.json()).then(async (responseJson) => {
                    //response coming from server
                    if (responseJson.status == "OK") {
                        await AsyncStorage.setItem('auth_code', responseJson.token);
                        navigation.navigate('Profile', {
                            state: "NEW"
                        })
                        setUserData({
                            token : responseJson.token
                        });
                    } else {
                        ToastAndroid.show(responseJson.error)
                    }
                }).catch((error) => {
                    ToastAndroid.show("Internal Server Error Occured!",ToastAndroid.SHORT)
                })
            } else {
                ToastAndroid.show("Please enter Same password for both", ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show("Please Enter Valid email and(or) password",ToastAndroid.SHORT);
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
                        
                            <TextInput value={email} onChangeText={setemail}  style={styles.input} placeholder="Email" theme={{colors:{primary:'#6B8E23'}}} /> 
                        <TextInput value={password} onChangeText={setpassword} style={styles.input} placeholder="Password" secureTextEntry={passwordVisible}
                            right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />} theme={{colors:{primary:'#6B8E23'}}} />
                        <TextInput value={ReTypepassword} onChangeText={Resetpassword} style={styles.input} placeholder="ReType-Password"
                            secureTextEntry={RepasswordVisible} right={<TextInput.Icon name={RepasswordVisible ? "eye" : "eye-off"} onPress={() => ResetPasswordVisible(!RepasswordVisible)} />} theme={{colors:{primary:'#6B8E23'}}}  />
                        
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
    htext: {
        justifyContent:'center'
    },
    backImage: {
        width:'100%',
        height: 250,
        justifyContent: 'center',
    },
    Touchable: {
        backgroundColor: '#6B8E23',
        padding: 15,
        borderRadius: 20,
         
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
        margin:5,
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
    },
    container: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center'
    }


    
});

export default Register;
