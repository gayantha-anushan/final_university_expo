import React from 'react'
import{Image,StyleSheet,View,Text, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, Dimensions} from 'react-native'

const Login = ({ navigation })=> {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={styles.mainCont}>
                    <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                    <Text style={styles.headerText}>Vege Sup</Text>
                </View>
                
                    <View style={styles.adjuster}>
                        <Image style={styles.backImage} source={require('../assets/Farmer.png')} />
                </View>
            
                <View style={styles.ButtonCont}>
                    <TouchableOpacity style={styles.Touchable}  onPress={()=>navigation.navigate('Login')}>
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
    adjuster: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    backImage: {
        width:'80%',
        height:Dimensions.get("screen").height -300,  
        borderRadius:10
    },
    Touchable: {
        backgroundColor: '#6B8E23',
        padding: 15,
        borderRadius: 20,
        paddingHorizontal: 50,
    },
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    }

    
});

export default Login;
