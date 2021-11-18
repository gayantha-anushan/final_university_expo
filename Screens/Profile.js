import React from 'react'
import { View, RadioButton,Text,StyleSheet,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard,Image, TextInput, TouchableOpacity } from 'react-native'

const Profile = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.mainCont}>
                        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                        <Text style={styles.headerText}>Profile</Text>
                    </View>
                        <Text style={styles.Text}>First Name</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.Text}>Last Name</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.Text}>Address</Text>
                        <TextInput style={styles.input1} />
                        <Text style={styles.Text}>Profile Picture</Text>
                        <TouchableOpacity style={styles.Touchable}><Text style={styles.Text}>Choose the Photo</Text></TouchableOpacity>  
                        <Text style={styles.Text}>Contact</Text>
                    <TextInput style={styles.input} />
                    <Text style={styles.Text}>Type</Text>
                    


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
    input: {
        margin: 10,
        marginHorizontal:5,
        borderWidth: 1,
        padding: 13,
        borderRadius: 20,
        borderColor: '#696969',
        justifyContent: "center",
    },
    input1: {
        margin: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 50,
        borderRadius: 20,
        borderColor: '#696969',
        justifyContent: "center",
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent:"center"
    },
    Touchable: {
        backgroundColor: '#59E64C',
        padding: 12,
        borderRadius: 20,
        paddingHorizontal: 20,
    
    },
    

    
})


export default Profile;
