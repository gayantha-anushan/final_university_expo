import React,{useState,useEffect} from 'react'
import { View,Dimensions,Text,StyleSheet,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard,Image, TextInput, TouchableOpacity } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import MapView from 'react-native-maps';
import Connection from '../Connection';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const radioButtonsData = [
  {
    id: '1',
    label: 'Farmer',
    value: 'option1',
    color: 'black',
    selected: true,
  },
  {
    id: '2',
    label: 'WholeSaler',
    value: 'option2',
    color: 'black',
    selected: false,
    },
  {
    id: '3',
    label: 'Local Seller',
    value: 'option3',
    color: 'black',
    selected: false,
    },
  {
    id: '4',
    label: 'Customer',
    value: 'option4',
    color: 'black',
    selected: false,
  },
];
const Profile = ({route,navigation}) => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    const { state} = route.params

    useEffect(() => {
        if(state == "NEW"){
            //
        }else{
            //
        }
    }, [])
    

 /* const onPressRadioButton = radioButtonsArray => {
    console.log(radioButtonsArray);
    setRadioButtons(radioButtonsArray);
  };*/

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  
  const getAction = () => {
      if(state == "NEW"){
          uploadProfileData();
      }else{
          updateProfileData();
      }
  }

  const updateProfileData = () => {
    try{
        var uid;
        AsyncStorage.getItem("auth_code",(error,result)=>{
            if(error){
                console.log(error)
            }else{
                fetch(Connection.getConnection()+"/api/auth/update-profile",{
                    method:"POST",
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        token:result,
                        firstname:firstName,
                        lastname:lastName,
                        address:address,
                        contact:contact
                    })
                }).then((response)=>response.json()).then((responseJson)=>{
                  //post action after setup url
                  console.log(responseJson.id)
                  AsyncStorage.setItem("current_profile",responseJson.id)
                  navigation.navigate('DrawerContainer')
              })
            }
        })      
    }catch(error){
        console.log(error);
    }
  }

  const uploadProfileData = () => {
      try{
        var uid;
        AsyncStorage.getItem("auth_code",(error,result)=>{
            if(error){
                console.log(error)
            }else{
                fetch(Connection.getConnection()+"/api/auth/new-profile",{
                    method:"POST",
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        token:result,
                        firstname:firstName,
                        lastname:lastName,
                        address:address,
                        contact:contact
                    })
                }).then((response)=>response.json()).then((responseJson)=>{
                  //post action after setup url
                  console.log(responseJson.id)
                  AsyncStorage.setItem("current_profile",responseJson.id)
                  navigation.navigate('DrawerContainer')
              })
            }
        })

      
    }catch(error){
        console.log(error);
    }
  }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.mainCont}>
                        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                        <Text style={styles.headerText}>Profile</Text>
                    </View>
                        <Text style={styles.Text}>First Name</Text>
                        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />
                        <Text style={styles.Text}>Last Name</Text>
                        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />
                        <Text style={styles.Text}>Address</Text>
                        <TextInput value={address} onChangeText={setAddress} style={styles.input1} />
                    <Text style={styles.Text}>Profile Picture</Text>
                    <View style={styles.ButtonCont1}>
                        <TouchableOpacity style={styles.Touchable}><Text style={styles.Text}>Choose the Photo</Text></TouchableOpacity>
                    </View> 
                        <Text style={styles.Text}>Contact</Text>
                        <TextInput value={contact} onChangeText={setContact} style={styles.input} />
                        <Text style={styles.Text}>Type</Text>
                        <View style={styles.container}>
                            <RadioGroup radioButtons={radioButtons} /*onPress={onPressRadioButton}*/ layout="column"/>
                    </View>
                    <Text style={styles.Text}>Location</Text>
                        <View style={styles.container1}>
                        <MapView style={styles.map} />
                    </View>
                    <View style={styles.ButtonCont1}>
                    <TouchableOpacity style={styles.Touchable1} onPress={()=>getAction()}>
                            <Text style={styles.Text}>Submit</Text>
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
        height: '100%',
        padding: 6,
        paddingTop:1
    },
    mainCont: {
        paddingTop: 20,
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
        marginLeft: 30,
        paddingTop: 20, 
    },
    input: {
        margin: 10,
        marginHorizontal:5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        borderColor: '#696969',
        justifyContent: "center",
    },
    input1: {
        margin: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 15,
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
        padding: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
    
    },
    Touchable1: {
        backgroundColor: '#59E64C',
        borderColor:'rgba(0,0,0,0.2)',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        flexDirection: 'row',
    },
    ButtonCont1: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingTop:10
    
},
    container: {
        display:'flex',
        flexDirection:'row'
    },
    container1: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  },
  map: {
        width:350,
        height:350
  },
    
})
export default Profile;
