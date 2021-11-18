import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard} from 'react-native'

const Register = ({ navigation }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [ReTypepassword, Resetpassword] =useState('');

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
                        <TouchableOpacity style={styles.Touchable} onPress={()=>navigation.navigate('Profile')}>
                <Text style={styles.Text}>Register</Text>
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
        color: '#59E64C',
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
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:20

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
    container: {
        
        

    }

    
});

export default Register;
