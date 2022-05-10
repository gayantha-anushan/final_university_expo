import React from 'react'
import{Image,StyleSheet,View,Text, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard} from 'react-native'

const Login = ({ navigation })=> {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
            <View style={styles.mainCont}>
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                <Text style={styles.headerText}>Vege Sup</Text>
            </View>
                <Image style={styles.backImage} source={require('../assets/Farmer.png')} />
            <View style={styles.ButtonCont}>
                <TouchableOpacity style={styles.Touchable}  onPress={()=>navigation.navigate('Register')}>
                    <Text style={styles.Text}>Get Started</Text>
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
        marginLeft: 25,
        paddingTop: 20,
        
    },
    backImage: {
        width:370,
        height: 400,        
    },
    Touchable: {
        backgroundColor: '#43e864',
        padding: 15,
        borderRadius: 20,
        paddingHorizontal: 40,  
    },
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:70

    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'white'
    }

    
});

export default Login;
