import { StyleSheet, KeyboardAvoidingView,Text, View, TouchableOpacity, Image ,TouchableWithoutFeedback,Keyboard,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native'
import * as ImagePicker from  'expo-image-picker'
import { getConnection } from '../Connection'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Checkbox from 'expo-checkbox'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import NumericInput from 'react-native-numeric-input'
import { AntDesign } from '@expo/vector-icons';
import Textarea from 'react-native-textarea';
import { ProgressDialog } from 'react-native-simple-dialogs'

const CreatePost = ({navigation}) => {

    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("")
    const [wholeSeller, setWholeSeller] = useState("")
    const [localSeller, setLocalSeller] = useState("")
    const [customer, setCustomer] = useState("")
    const[description,setdescription]=useState("")
    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    const [type, setType] = useState(null)
    const [location, setLocation] = useState(null)
    const [point, setPoint] = useState(null)
    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("current_profile",(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
                setAuthToken(result)
            }
        })
        getLocation()
    }, [])

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
            latitudeDelta:0,
            longitudeDelta:0
        })
        setPoint({
            latitude:locations.coords.latitude,
            longitude:locations.coords.longitude
        })
        console.log(location)
    }

    const [authToken, setAuthToken] = useState(null)

    const openImagePickerAsync = async () => {        
        var permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("Permission to access camera roll is required!");
            return
        }

        var pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if(pickerResult.cancelled == true){
            return
        }


        setImage({localUri:pickerResult.uri})

        var localuri = pickerResult.uri;
        var filename = localuri.split("/").pop();

        //infer the type of the image
        var match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}`:`image`;
        setName(filename)
        setType(type)
    }

    const uploadContent = () => {
        setIsProgress(true)
        if (isChecked) {
            var typei = "Auction"
        } else {
            var typei = "Direct Sell"
        }

        console.log("Pressed")

        var formdata = new FormData();
        formdata.append('title',title)
        formdata.append('quantity',quantity)
        formdata.append('profile_id', authToken)
        formdata.append('type',typei)
        formdata.append('wholeseller', wholeSeller)
        formdata.append("description",description)
        formdata.append('localseller',localSeller)
        formdata.append('date',new Date().toISOString())
        formdata.append('customer', customer)
        formdata.append('latitude', point.latitude)
        formdata.append('longitude',point.longitude)
        formdata.append('image',{type:type,uri:image.localUri,name:name})

        fetch(getConnection()+'/api/posts/createpost',{
            method: 'POST',
            body:formdata
        }).then((response)=>response.text()).then((responseText)=>{
            console.log("Responded by server")
            setTitle("")
            setQuantity("")
            setWholeSeller("")
            setLocalSeller("")
            setCustomer("")
            setdescription("")
            console.log(responseText)
            setIsProgress(false)
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <View>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
              <Header navigation={navigation}/>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <ScrollView>
            
                    <View style={styles.container}>
                       <Text style={styles.priceChooser}>Title:</Text>   
                        <TextInput value={title} onChangeText={setTitle} style={styles.inputStyler} placeholder='Title' />
                        <Text style={styles.priceChooser}>Available Quantity:</Text>   
                        <TextInput value={quantity} onChangeText={setQuantity} style={styles.inputStyler} placeholder='Available Quantity' keyboardType='numeric' />
                        <Text style={styles.priceChooser}>Auction Or Not?</Text>  
                        <View style={styles.auctionContainer}>
                        <Checkbox style={ styles.auctionChecker} value={isChecked} onValueChange={setIsChecked} />
                        <Text>Set As Auction</Text>
                    </View> 
                    <View style={styles.num}>
                        <Text style={styles.priceChooser}>Expire in Days:</Text>
                        <NumericInput type='plus-minus' onChange={value => console.log(value)} minValue={0} totalWidth={100} totalHeight={50} iconSize={20} rounded valueType='real' rightButtonBackgroundColor='#4d8aeb' leftButtonBackgroundColor='#4d8aeb' />
                    </View>
                    <Text style={styles.priceChooser}>Price:</Text>
                    <View style={styles.container2}>
                        <TextInput value={wholeSeller} onChangeText={setWholeSeller} style={styles.inputStyler} placeholder='WholeSeller' keyboardType='numeric'/>
                        <TextInput value={localSeller} onChangeText={setLocalSeller} style={styles.inputStyler} placeholder='Local Seller'  keyboardType='numeric'/>
                        <TextInput value={customer} onChangeText={setCustomer} style={styles.inputStyler} placeholder='Customer'  keyboardType='numeric'/>
                    </View>
                        <Text style={styles.priceChooser}>Description:</Text>
                        <Textarea style={{height:170,borderRadius:10,backgroundColor:'#e9e9e9'}} maxLength={200} placeholder={'Description'} placeholderTextColor={'#c7c7c7'}/>
                    <View style={ styles.disBottom}>
                      {
                      image ? (<Image source={{ uri: image.localUri }} resizeMode="stretch" style={styles.imagine}/>):null
                      }
                        <View style={styles.icon}>
                          <TouchableOpacity style={styles.imagePickerBtn} onPress={() => openImagePickerAsync()}>
                                <AntDesign name={'picture'} size={20} color="white"></AntDesign>
                                <Text style={ styles.imagePickerText}>Add Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                        <TouchableOpacity onPress={() => uploadContent()} style={styles.buttonCover}>
                            <View style={styles.gap}>
                                <AntDesign name={'checkcircle'} size={20} color="white"></AntDesign>
                                <Text style={styles.buttonText}>Create Post</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.priceChooser}>Location:</Text>
                          
                    </View>
    
                  {
                      location ? (<MapView initialRegion={location} style={styles.mapStyler}>
                            {
                              point ? (<Marker coordinate={point} draggable onDragEnd={(e)=>setPoint(e.nativeEvent.coordinate)} title="Place Your Product" description='Locate your product for more customer engage to your product' />):null
                            }
                        </MapView>):null
                  }
                  <ProgressDialog activityIndicatorSize="small" activityIndicatorColor="gray" visible={isProgress} title="Uploading Post" message='Please wait moment....' />
            
                  </ScrollView>
      </TouchableWithoutFeedback>
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
    imagePickerBtn: {
        backgroundColor:'#4d8aeb',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:150,
        borderRadius:20,
        marginTop:10,
        marginLeft: 8,
        flexDirection:'row'
    },
    imagine: {
        height: 150,
        width: '50%',
        marginLeft: 40,
        borderRadius: 20,
    },
    imagePickerText: {
        color:'#fff'
    },
    container2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonCover:{
        backgroundColor:'#6B8E23',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:150,
        borderRadius:20,
        marginLeft: 100,
        flexDirection:'row'
    },
    mapStyler: {
        height: 250,
        width: 400,
        paddingBottom: 20,
        paddingLeft:20
    },
    auctionContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 3,
        alignItems:'center'
    },
    disBottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    buttonText:{
        color:'#ffffff'
    },
    auctionChecker: {
        margin: 5,
        marginRight:15
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
        fontWeight:'bold',
        fontSize: 16,
        justifyContent:'flex-start'
    },
    num: {
        flexDirection:'row'
    },
    icon: {
        flexDirection: 'row',
    },
    gap: {
        flexDirection: 'row',
        justifyContent:'space-around'
    }
})