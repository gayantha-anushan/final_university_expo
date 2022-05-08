import { StyleSheet, KeyboardAvoidingView,Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native'

const CreatePost = ({navigation}) => {
  return (
    <View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation}/>
            <View style={styles.container}>
                <TextInput style={styles.inputStyler} placeholder='Title' />
                <TextInput style={styles.inputStyler} placeholder='Available Quantity'/>
                <Text style={styles.priceChooser}>Price</Text>
                <View style={styles.container2}>
                    <TextInput style={styles.inputStyler} placeholder='WholeSeller'/>
                    <TextInput style={styles.inputStyler} placeholder='Local Seller'/>
                    <TextInput style={styles.inputStyler} placeholder='Customer'/>
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({
    mainArea: {
        backgroundColor: "white",
        height:'100%',
    },
    container:{
        margin:10
    },
    container2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inputStyler:{
        backgroundColor:'#e9e9e9',
        textAlign:'center',
        margin:5,
        padding:8,
        borderRadius:10,
        fontSize:16
    },
    priceChooser:{
        marginLeft:5,
        fontWeight:'bold',
        fontSize:16
    }
})