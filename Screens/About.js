import { StyleSheet, Text, View,TouchableOpacity,Dimensions,Image,ScrollView,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


const About = ({ navigation }) => {
  return (
    <View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Interface")}>
          <AntDesign name="arrowleft" size={30}></AntDesign>
        </TouchableOpacity>
        <Text style={styles.text}>About</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.adjuster}>
              <View>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', fontStyle: 'italic'}}>Description of Application:</Text>
            <Text style={{color:'black',fontSize:15,fontWeight:'bold',opacity:0.9,color:'#6B8E23',margin:4,alignSelf:'stretch',fontStyle:'italic'}}>A successful solution to this is to build a common interaction between farmers and traders by creating a system that provide access to information about farmers across the country and their products to traders.
It is important to build the necessary media to exchange information between farmers and traders and to pass on information about farmers’ produce to traders.
</Text>
            </View>
          <Image style={styles.backImage} source={require('../assets/Aboutus.png')} />
        </View>
        <View style={styles.textcont}>
          <Text style={styles.textcontainer}>This app build by the below-mentioned university students for their final group project.</Text>
      </View>
      <View style={styles.cardcont}>
        <View style={styles.card2}>
          <Image style={styles.image} source={require('../assets/kasun.jpg')}></Image>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >Kasun Thenuwara</Text>
          <Text style={{ fontSize: 15,fontWeight:'bold',alignContent:'center'}} >(Team Leader)</Text>
        </View>
        <View style={styles.card2}>
          <Image style={styles.image} source={require('../assets/gayantha.jpg')}></Image>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >Gayantha Anushan</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >(Backend Developer)</Text>
          
        </View>
      </View>
      <View style={styles.cardcont}>
        <View style={styles.card2}>
          <Image style={styles.image} source={require('../assets/ruwan.jpg')}></Image>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >Ruwan Bandara</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >(Frontend Developer)</Text>
        </View>
        <View style={styles.card2}>
          <Image style={styles.image} source={require('../assets/miraj.jpg')}></Image>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >Miraj Manage</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignContent: 'center' }} >(Analyser)</Text>
        </View>
      </View>
      <Text style={{fontWeight:'bold',fontStyle:'italic',paddingLeft:10}}>Version:1.0</Text>
        </ScrollView>
        </TouchableWithoutFeedback>
</KeyboardAvoidingView>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#a9a9a9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
   mainArea: {
     backgroundColor: "white",
     height:'100%',
 },
text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
textcontainer: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 350,
    color: 'white',
    maxHeight: 500,
    justifyContent: 'center',
    opacity: 0.9,
    alignContent: 'center',
    margin: 1,
    padding: 2,
    fontStyle:'italic'
    
  },
  textcont: {
    backgroundColor: '#4d8aeb',
    borderRadius: 50,
    justifyContent: 'center',
    opacity: 0.9,
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingTop: 1
    
  },
adjuster: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  borderRadius: 100,
    paddingTop:1
},
backImage: {
    width:'90%',
    height:Dimensions.get("screen").height -580,  
  borderRadius: 100,
    
    
  },
cardcont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
card2: {
    borderRadius: 30,
    padding: 15,
    margin: 1,
    
  },
  image: {
    width:130,
    height: 130,
    borderRadius: 50,
    alignContent:'flex-start'
}
})