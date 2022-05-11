import React from 'react';
import {Text,StyleSheet,View,ScrollView,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import { TextInput,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Message = ({navigation}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
                    <View style={styles.maincont}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                            <AntDesign name="left" size={40} color="black"></AntDesign>
                        </TouchableOpacity>
                        
                        <Image source={require('../assets/profile.jpg')} style={styles.image}></Image>
                        <TouchableOpacity onPress={()=>navigation.navigate("ViewProfile")}>
                            <Text style={styles.maintext}>Amal Srinath</Text>  
                        </TouchableOpacity>
                        </View>

                    <View style={styles.messagecontainer}>
                    <View style={styles.Message}>
                       <TextInput style={styles.Input} placeholder='Message' />
                            <TouchableOpacity style={styles.Touchable}>
                            </TouchableOpacity>
                        </View>
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
    maincont: {
        paddingTop: 60,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#40e0d0',
        justifyContent:'flex-start'
        
        
    },
    maintext: {
        fontSize: 25,
        textAlign: "justify",
        fontWeight:'bold'
        
    },
    icon1: {
        paddingTop:6
    },
    icon: {
        marginLeft: 200,
        paddingTop:10

    },
    messagecontainer: {
        paddingTop:650
    },
    image: {
        width: 40,
        height: 40,
        borderRadius:30
    },
    Input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius:10,
        marginHorizontal:10,
        marginBottom:8,
        borderColor: "green",  
        padding:8
}       
    
});
export default Message;