import React from 'react';
import { View,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,StyleSheet,Keyboard,Image,Text,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
const Interface = ({navigation }) => {
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.mainCont}>
                        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                        <Text style={styles.headerText}>Vege Sup</Text>   
                    </View>
                    <View style={styles.search}>
                        <TextInput style={styles.Input} placeholder='Search here......' />
                            <TouchableOpacity style={styles.Touchable}>
                                <View style={styles.icon}>
                                <AntDesign name="search1" color="black" size={32} />
                                </View>
                            </TouchableOpacity>
                        

                    </View>
                    <View style={styles.mainCont1}>
                        <AntDesign name="profile" size={30} color="black" />
                        <AntDesign name="home" size={30} color="black" />
                        <AntDesign name="gift" size={30} color="black" />
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <AntDesign name="notification" size={30} color="black" />
                        <TouchableOpacity onPress={()=>navigation.navigate('Message')}>
                            <AntDesign name="message1" size={30} color="black" />
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
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 170,
        paddingTop:4, 
    },
    mainCont1: {
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        
    },
    search: {
        borderWidth: 1,
        flexDirection: 'row',
        height: 45,
        margin: 4,
        borderRadius:10
        
        
    },
    Input: {
        backgroundColor: "white",
        display: 'flex',
        marginHorizontal: 20,
        flexDirection: 'row',
        borderColor: "green",  
        
    },
    
    
});
export default Interface;