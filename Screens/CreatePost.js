import { StyleSheet, KeyboardAvoidingView,Text, View, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native'
import * as ImagePicker from  'expo-image-picker'
import { getConnection } from '../Connection'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreatePost = ({navigation}) => {

    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("")
    const [wholeSeller, setWholeSeller] = useState("")
    const [localSeller, setLocalSeller] = useState("")
    const [customer, setCustomer] = useState("")
    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem("current_profile",(error,result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
                setAuthToken(result)
            }
        })
    }, [])

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
        var formdata = new FormData();
        formdata.append('title',title)
        formdata.append('quantity',quantity)
        formdata.append('profile_id',authToken)
        formdata.append('wholeseller',wholeSeller)
        formdata.append('localseller',localSeller)
        formdata.append('date',new Date().toISOString())
        formdata.append('customer',customer)
        formdata.append('image',{type:type,uri:image.localUri,name:name})

        fetch(getConnection()+'/api/posts/createpost',{
            method:'POST',
            body:formdata
        }).then((response)=>response.text()).then((responseText)=>{
            console.log("Responded by server")
            console.log(responseText)
        })
    }

  return (
    <View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <Header navigation={navigation}/>
            <View style={styles.container}>
                <TextInput value={title} onChangeText={setTitle} style={styles.inputStyler} placeholder='Title' />
                <TextInput value={quantity} onChangeText={setQuantity} style={styles.inputStyler} placeholder='Available Quantity'/>
                <Text style={styles.priceChooser}>Price</Text>
                <View style={styles.container2}>
                    <TextInput value={wholeSeller} onChangeText={setWholeSeller} style={styles.inputStyler} placeholder='WholeSeller'/>
                    <TextInput value={localSeller} onChangeText={setLocalSeller} style={styles.inputStyler} placeholder='Local Seller'/>
                    <TextInput value={customer} onChangeText={setCustomer} style={styles.inputStyler} placeholder='Customer'/>
                </View>
                <TouchableOpacity onPress={()=>openImagePickerAsync()}>
                    <Text>Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>uploadContent()} style={styles.buttonCover}>
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
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
    buttonCover:{
        backgroundColor:'green',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:150,
        borderRadius:20,
        marginTop:10,
        marginLeft:8
    },
    buttonText:{
        color:'#ffffff'
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