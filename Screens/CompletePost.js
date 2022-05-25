import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView } from 'react-native'
import React, { useEffect,useState} from 'react'
import { getConnection } from '../Connection'
import { AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'


const CompletePost = ({ route,navigation}) => {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [Amount, setAmmount] = useState("");


    const { id } = route.params

    useEffect(() => {
        fetch(getConnection() + "/api/posts/singlepost/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])
    
    return (
        <ScrollView>
            <View style={styles.maincont}>
                <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                <AntDesign name="arrowleft" size={25} color="black"></AntDesign>
                </TouchableOpacity>
                <Text style={styles.text}>Product Details</Text>
            </View>
            <View style={styles.imagecontainer}>
                <Image style={styles.image} source={require('../assets/strawberry.jpg')}></Image>
                <View style={styles.textcont}>
                    <View style={styles.iconset}>
                        <AntDesign name="codepen-circle" size={30}></AntDesign>
                        <Text style={styles.text1}>Direct Sell</Text>
                    </View>
                    <View style={styles.iconset}>
                        <AntDesign  name="inbox" size={30}></AntDesign>
                        <Text style={styles.text1}>1000kg</Text>
                    </View>
                    <View style={styles.iconset}>
                        <AntDesign name="wallet" size={30}></AntDesign>
                        <Text style={styles.text1}>Rs.3000</Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.des}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', alignItems: 'center', marginLeft: 120 }}>Strawberry</Text>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Description:</Text>
                    <Text style={{fontSize:15,marginEnd:93}}>The garden strawberry (or simply strawberry; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries, which are cultivated worldwide for their fruit.</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Expiry in:</Text>
                    <Text style={{fontSize:15,marginStart:20,fontWeight:'bold'}}>07 Days</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Contacts:</Text>
                    <Text style={{fontSize:15,marginStart:20,}}>0334523675</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Quantity(kg):</Text>
                    <NumericInput type='up-down' onChange={value => console.log(value)} totalWidth={100} totalHeight={50}
                        iconSize={20} rounded valueType='real' rightButtonBackgroundColor='#EA3788' leftButtonBackgroundColor='#E56B70'/>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Amount(Rs):</Text>
                    <Text style={{fontSize:15,marginStart:8,fontWeight:'bold'}}>2500</Text>
                </View>

                <TouchableOpacity style={styles.btn1}>
                    <AntDesign name="shoppingcart" size={30} color="black"></AntDesign>
                    <Text style={styles.text2}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
  )
}

export default CompletePost

const styles = StyleSheet.create({
    main: {
    },
    maincont: {
        padding: 20,
        backgroundColor: '#a9a9a9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:30
    },
    text: {
        fontSize: 20,
        fontWeight:'bold'
    },
    image: {
        width: 250,
        height: 250,
        justifyContent:"center",
        opacity: 0.8,
        borderRadius: 30,
        margin: 8,
        marginLeft:60
    },
    des: {
        justifyContent: "center",
        backgroundColor:'white',
        borderRadius: 20,
    },
    imagecontainer: {
        margin: 5,
        
    },
    text1: {
        fontSize: 18,
        fontWeight:'bold'
    },
    text2: {
        fontSize: 20,
        fontWeight:'bold'
    },
    textcont: {
        padding: 12,
        backgroundColor: '#add8e6',
        borderRadius: 20,
        flexDirection:'row'
    },
    iconset: {
        flexDirection: 'row',
        margin:8
    },
    description: {
        flexDirection: 'row',
        margin:2
    },
    btn1:{
        backgroundColor:'#c4c4c4',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:12,
        paddingHorizontal:4,
        borderRadius: 10,
        margin:5,
        flexDirection: 'row',
        borderColor:'black'
}
})