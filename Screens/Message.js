import React from 'react';
import {Text,StyleSheet,View,ScrollView,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Message = ({ }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
                    <View style={styles.maincont}>
                        <Text style={styles.maintext}>Amal Srinath</Text>
                        <View style={styles.icon1}>
                            <AntDesign name="profile" color='black' size={30}/>
                        </View>
                    </View>

                    <View style={styles.messagecontainer}>
                    <View style={styles.Message}>
                        <TextInput style={styles.input} placeholder='Message'/>
                            <TouchableOpacity style={styles.Touchable}>
                                <View style={styles.icon}>
                                    <AntDesign name="enter" color="black" size={32}/>
                                </View>
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
        backgroundColor: '#59E64C',
        alignItems:'stretch'
    },
    maintext: {
        fontSize: 25,
        marginLeft:200
        
    },
    icon1: {
        paddingTop:6
    },
    Message: {
        borderWidth: 1,
        flexDirection: 'row',
        margin: 4,
        borderRadius: 10,
        
    },
    input: {
        backgroundColor: "white",
        display: 'flex',
        marginHorizontal: 20,
        flexDirection: 'row',
        borderColor: "green", 

    },
    icon: {
        marginLeft: 200,
        paddingTop:10

    },
    messagecontainer: {
        paddingTop:650
    }
    
});
export default Message;