import React from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard,Image,Text,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const Interface = ({ }) => {
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.mainCont}>
                        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                        <Text style={styles.headerText}>Vege Sup</Text>
                        <View style={styles.icon}>
                            <TouchableOpacity style={styles.Touchable1}>
                                
                                <AntDesign name="search1" size={30} color="black" />
                                
                            </TouchableOpacity>
                        </View>  
                    </View>
                    <View style={styles.mainCont1}>
                        <AntDesign name="profile" size={35} color="black" />
                        <AntDesign name="home" size={35} color="black" />
                        <AntDesign name="gift" size={35} color="black" />
                        <AntDesign name="shoppingcart" size={35} color="black" />
                        <AntDesign name="notification" size={35} color="black" />
                        <AntDesign name="message1" size={35} color="black"/>
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
    logo: {
        width:120,
        height: 120,
        display: 'flex',
    },
    headerText: {
        fontSize: 36,
        color: '#59E64C',
        fontWeight: 'bold',
        marginLeft: 20,
        paddingTop: 20,
    
    },
    mainCont: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        paddingTop: 40,
        paddingLeft:40
    },
    mainCont1: {
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        
    },
    
});
export default Interface;