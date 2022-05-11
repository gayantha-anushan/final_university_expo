import { StyleSheet, Text, View ,Image,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Touchable } from 'react-native-web';

const ViewProfile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titlebar}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                        <AntDesign name="left" size={35} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Message")}>
                        <AntDesign name="message1" size={32} color="black" />
                    </TouchableOpacity>
                    
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileimage}>
                        <Image source={require('../assets/profile.jpg')} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.add}>
                        <TouchableOpacity>
                            <AntDesign name="pluscircle" size={50} color="black" style={{ marginTop: 130, marginLeft: 150 }}></AntDesign>
                        </TouchableOpacity>
                        
                    </View>
                    <Text style={styles.text}>Amal Srinath</Text>
                    
                </View>
                <View style={styles.textset}>
                    <AntDesign name="user" size={25} color="black"></AntDesign>
                    <Text style={styles.text1}>Postion As:</Text>
                    <Text style={styles.text2}>Farmer</Text>
                </View>
                <View style={styles.textset}>
                    <AntDesign name="carryout" size={25} color="black"></AntDesign>
                    <Text style={styles.text1}>Worked At:</Text>
                    <Text style={styles.text2}>Amarasena Farmers</Text>
                </View>
                <View style={styles.textset}>
                    <AntDesign name="tags" size={25} color="black"></AntDesign>
                    <Text style={styles.text1}>Location:</Text>
                    <Text style={styles.text2}>NuwaraEliya</Text>
                </View>
                <View style={styles.textset}>
                    <AntDesign name="home" size={25} color="black"></AntDesign>
                    <Text style={styles.text1}>Address:</Text>
                    <Text style={styles.text2}>294/A Silva Rd,NuwaraEliya</Text>
                </View>     
                <View style={styles.textset}>
                    <AntDesign name="phone" size={25} color="black"></AntDesign>
                    <Text style={styles.text1}>Phone Number:</Text>
                    <Text style={styles.text2}>0773456272</Text>
                </View> 
                <View style={styles.ButtonCont}>
                <TouchableOpacity style={styles.touchable} onPress={()=>navigation.navigate("Profile")}>
                        <Text style={styles.text1}>Edit Profile Details</Text>
                        

                    </TouchableOpacity>
                </View>
                
            </ScrollView>
      </SafeAreaView>
  )
}

export default ViewProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#48d1cc',
    },
    titlebar: {
        flexDirection: 'row',
        marginTop: 45,
        justifyContent: 'space-between',
        marginHorizontal:15
    },
    image: {
        flex:1,
        width: undefined,
        height: undefined,
        
    },
    add: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems:'center'
        
    },
    profileimage: {
        overflow:'hidden',
        width: 200,
        height: 200,
        borderRadius: 80,
        color:"black"
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        
    },
    text1: {
        fontSize: 20,
        marginStart: 10,
        fontWeight: 'bold',
        color:"white"
    },
    text2: {
        fontSize: 20,
        color:"black"
    },
    textset: {
        flexDirection: 'row',
        marginHorizontal: 25,
        paddingTop:25
    },
    touchable: {
        backgroundColor: '#ee82ee',
        padding: 10,
        borderRadius: 20,
        paddingHorizontal: 40,  
    },
    ButtonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:80
},
})