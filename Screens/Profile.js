import React,{useState,useEffect} from 'react'
import { View,Dimensions,Text,StyleSheet,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard,Image, TextInput, TouchableOpacity } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import MapView, { Marker} from 'react-native-maps';
import Connection, { getConnection } from '../Connection';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import Strawberry from '../assets/strawberry.jpg'
import * as ImagePicker from 'expo-image-picker'
const radioButtonsData = [
  {
    id: '1',
    label: 'Farmer',
    value: 'farmer',
    color: 'black',
    selected: true,
  },
  {
    id: '2',
    label: 'WholeSaler',
    value: 'wholeseller',
    color: 'black',
    selected: false,
    },
  {
    id: '3',
    label: 'Local Seller',
    value: 'localseller',
    color: 'black',
    selected: false,
    },
  {
    id: '4',
    label: 'Customer',
    value: 'customer',
    color: 'black',
    selected: false,
  },
];
const Profile = ({route,navigation}) => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [profileID, setProfileID] = useState(null)
    const [location, setLocation] = useState(null)
    const [selectedUserType, setSelectedUserType] = useState(null)
    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [type, setType] = useState(null)
    const [point, setPoint] = useState({
        latitude: 0,
        longitude:0
    })

    const { state} = route.params

    useEffect(() => {
        getLocation();
        if(state == "NEW"){
            
        }else{
            AsyncStorage.getItem("current_profile",(error,result)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log(result)
                    setProfileID(result);
                    loadPreviousDetails(result);
                }
            })
        }
    }, [])

    const loadPreviousDetails = (id) => {
        var url = getConnection() + "/api/auth/get-profile/" + id
        console.log(url);
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            }
        }).then((response) => response.json()).then((jsonresult) => {
            console.log(jsonresult);
            setFirstName(jsonresult.firstname)
            setLastName(jsonresult.lastname)
            setAddress(jsonresult.address)
            setContact(jsonresult.contact)
            setLocation({
                latitude:jsonresult.latitude,
                longitude:jsonresult.longitude,
                latitudeDelta:0.01,
                longitudeDelta:0.01
            })
            setPoint({
                latitude: jsonresult.latitude,
                longitude:jsonresult.longitude
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    const getLocation = async() =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted"){
            console.log("Not Permission Granted!");
            return;
        }
        let locations = await Location.getCurrentPositionAsync()
        setLocation({
            latitude:locations.coords.latitude,
            longitude:locations.coords.longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01
        })
        setPoint({
            latitude:locations.coords.latitude,
            longitude:locations.coords.longitude
        })
        console.log(location)
    }
    

 const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  
  const openImagePicker = async () =>{
      var permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(permissionResult.granted == false){
          alert("Permission Access to Camera roll is required!")
          return
      }
      var pickerResult = await ImagePicker.launchImageLibraryAsync();
      if(pickerResult.cancelled == true){
          return
      }
      setImage({localUrl:pickerResult.uri})
      var localUri = pickerResult.uri;
      var filename = localUri.split("/").pop();

      var match =  /\.(\w+)$/.exec(filename);
      var type = match ? `image/${match[1]}`:`image`;
      setName(filename)
      setType(type)
  }

  const getAction = () => {

    for(var i = 0; i < radioButtons.length ; i++){
        if(radioButtons[i].selected == true){
            setSelectedUserType(radioButtons[i].value);
        }
    }

      if(state == "NEW"){
          uploadProfileData();
      }else{
          updateProfileData();
      }
  }

    const updateProfileData = () => {
        if (formVerifier()) {
            try {
                console.log("ok")
                var uid;
                AsyncStorage.getItem("auth_code", (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        var formdata = new FormData()
                        formdata.append('token', result)
                        formdata.append('firstname', firstName)
                        formdata.append('lastname', lastName)
                        formdata.append('profile', profileID)
                        formdata.append('address', address)
                        formdata.append('contact', contact)
                        formdata.append('latitude', point.latitude)
                        formdata.append('longitude', point.longitude)
                        formdata.append('type', selectedUserType)
                        formdata.append('image', { type: type, uri: image.localUrl, name: name })
                        fetch(Connection.getConnection() + "/api/auth/update-profile", {
                            method: "POST",
                            body: formdata
                        }).then((response) => response.json()).then((responseJson) => {
                            //post action after setup url
                            console.log("Successing");
                            alert("Changes Applied Successful!");
                        })
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
  }
  
    const formVerifier = () => {
        console.log("Called to me")
        var error = ""
        if (firstName == "") {
            error = "First Name Missing"
        }
        if (lastName == "") {
            error = "Last Name Missing"
        }
        if (address == "") {
            error = "address is missing"
        }

        if (contact == "") {
            error = "contact is missing"
        }
        if (type == null) {
            error = "Type is missing"
        }
        if (image == null) {
            error = "Image is not selected"
        }
        if (error !== "") {
            alert(error)
            return false
        } else {
            return true;
        }
    }

    const uploadProfileData = () => {
        if (formVerifier()) {
            try {
                AsyncStorage.getItem("auth_code", (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        var formdata = new FormData();
                        formdata.append('image', { type: type, uri: image.localUrl, name: name })
                        formdata.append('token', result)
                        formdata.append('firstname', firstName)
                        formdata.append('lastname', lastName)
                        formdata.append('address', address)
                        formdata.append('contact', contact)
                        formdata.append('latitude', point.latitude)
                        formdata.append('longitude', point.longitude)
                        formdata.append('type', selectedUserType)
                        AsyncStorage.getItem("auth_code", (error, result) => {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log("fetching")
                                fetch(Connection.getConnection() + "/api/auth/new-profile", {
                                    method: "POST",
                                    body: formdata
                                }).then((response) => response.json()).then((responseJson) => {
                                    //post action after setup url
                                    console.log(responseJson.id)
                                    AsyncStorage.setItem("current_profile", responseJson.id)
                                    navigation.navigate('DrawerContainer')
                                })
                            }
                        })
                    }
                });
      
            } catch (error) {
                console.log(error);
            }
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
                    {
                        image?(<Image source={{ uri: image.localUri }} resizeMode="contain" style={ styles.imagine} />):null
                    }
                    <View style={styles.ButtonCont1}>
                        <TouchableOpacity onPress={()=>openImagePicker()} style={styles.Touchable}><Text style={styles.Text}>Choose the Photo</Text></TouchableOpacity>
                    </View> 
                        <Text style={styles.Text}>Contact</Text>
                        <TextInput value={contact} onChangeText={setContact} style={styles.input} />
                        <Text style={styles.Text}>Type</Text>
                        <View style={styles.container}>
                            <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} layout="column"/>
                        {/* <SegmentedControl values={["Farmer", "Wholeseller", "Local Seller", "Customer"]} selectedIndex={index}  onChange={ (e)=>setIndex(e.nativeEvent.selectedSegmentIndex)} /> */}
                    </View>
                    <Text style={styles.Text}>Location</Text>
                        <View style={styles.container1}>
                        <MapView style={styles.map} initialRegion={location} onRegionChange={setLocation} >
                            <Marker coordinate={point} onDragEnd={(e)=>setPoint(e.nativeEvent.coordinate)} title="Selected Location" draggable  description='You Selected your location as here' />
                        </MapView>
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
    imagine: {
        height: 150,
        width:'50%'
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
