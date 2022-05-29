import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView, TextInput } from 'react-native'
import React, { useEffect,useState} from 'react'
import { getConnection } from '../Connection'
import { AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'
import { Dialog } from 'react-native-simple-dialogs'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletePost = ({ route,navigation}) => {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [Amount, setAmmount] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [expirity, setExpirity] = useState("")
    const [contact, setContact] = useState("")
    const [orderAmount, setOrderAmount] = useState(0)
    const [orderPrice, setOrderPrice] = useState(0)
    const [isShow, setIsShow] = useState(false)
    const [bidAmount, setBidAmount] = useState(0)
    const [buyDate, setBuyDate] = useState("")
    const [profileId, setProfileId] = useState(null)

    const { id } = route.params
    AsyncStorage.getItem('current_profile', (error, result) => {
        if (error) {
            console.log(error)
        } else {
            setProfileId(result)
        }
    })
    useEffect(() => {
        fetch(getConnection() + "/api/posts/singlepost/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            setImage(getConnection() + "/post-img/" + responseJson.image);
            setTitle(responseJson.title);
            setAmmount(responseJson.quantity)
            setPrice(responseJson.price.customer)
            setType(responseJson.type)
            setDescription(responseJson.description)
            setExpirity(responseJson.expirity)
            setContact(responseJson.author.contact)
            console.log(image)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    const bidNow = () => {
        if (profileId != null) {
            fetch(getConnection() + "/api/auction/bid", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: {
                    post: id,
                    bidder: profileId,
                    amount: bidAmount,
                    quantity: orderAmount,
                    buy_after: buyDate,
                    value: orderPrice,
                    timestamp: Date.now()
                }
            }).then((response) => response.json()).then((jsonResponse) => {
                console.log(jsonResponse)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const selectAmount = (value) => {
        if (Number(value) > Number(Amount)) {
            setOrderAmount(Amount);
            setOrderPrice(Number(Amount)*Number(price))
        } else {
            setOrderAmount(value);
            setOrderPrice(Number(value)*Number(price))
        }
        ////
    }
    
    return (
        <ScrollView>
            <View style={styles.maincont}>
                <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                <AntDesign name="arrowleft" size={25} color="black"></AntDesign>
                </TouchableOpacity>
                <Text style={styles.text}>Product Details</Text>
            </View>
            <View style={styles.imagecontainer}>
                {
                    image ? (<Image style={styles.image} source={{uri:image}}></Image>):null
                }
                <View style={styles.textcont}>
                    <View style={styles.iconset}>
                        <AntDesign name="codepen-circle" size={30}></AntDesign>
                        <Text style={styles.text1}>{ type}</Text>
                    </View>
                    <View style={styles.iconset}>
                        <AntDesign  name="inbox" size={30}></AntDesign>
                        <Text style={styles.text1}>{Amount }kg</Text>
                    </View>
                    <View style={styles.iconset}>
                        <AntDesign name="wallet" size={30}></AntDesign>
                        <Text style={styles.text1}>Rs.{ price}</Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.des}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', alignItems: 'center', marginLeft: 120 }}>{ title}</Text>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Description:</Text>
                    <Text style={{ fontSize: 15, marginEnd: 93 }}>{ description}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Expiry in:</Text>
                    <Text style={{ fontSize: 15, marginStart: 20, fontWeight: 'bold' }}>{ expirity} Days</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Contacts:</Text>
                    <Text style={{ fontSize: 15, marginStart: 20, }}>{ contact}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Quantity(kg):</Text>
                    <NumericInput type='up-down' onChange={value => selectAmount(value)} value={ orderAmount} totalWidth={100} totalHeight={50}
                        iconSize={20} rounded valueType='real' rightButtonBackgroundColor='#EA3788' leftButtonBackgroundColor='#E56B70'/>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Amount(Rs):</Text>
                    <Text style={{ fontSize: 15, marginStart: 8, fontWeight: 'bold' }}>{ orderPrice}</Text>
                </View>
                {
                    type == "Auction" ? (<View style={ styles.auctionButtonContainer}><TouchableOpacity onPress={()=>setIsShow(true)} style={styles.btn1}>
                    <AntDesign name="shoppingcart" size={30} color="black"></AntDesign>
                    <Text style={styles.text2}>Bid Now</Text>
                </TouchableOpacity><TouchableOpacity onPress={()=>navigation.navigate("ViewBids",{id:id})} style={styles.btn1}>
                    <AntDesign name="shoppingcart" size={30} color="black"></AntDesign>
                    <Text style={styles.text2}>All Bids</Text>
                </TouchableOpacity></View>):(<TouchableOpacity style={styles.btn1}>
                    <AntDesign name="shoppingcart" size={30} color="black"></AntDesign>
                    <Text style={styles.text2}>Add To Cart</Text>
                </TouchableOpacity>)
                }
                {/* if type is bid then this is place to implement all bids list in list */}
                <Dialog visible={isShow} title="Bid Now!" onTouchOutside={() => setIsShow(false)} >
                    <View>
                        <Text>Days</Text>
                        <TextInput style={styles.alertText} value={buyDate} onChangeText={setBuyDate} placeholder='How many days you take to buy ?' />
                        <Text>Bid Amount</Text>
                        <TextInput value={bidAmount} style={styles.alertText} onChangeText={ setBidAmount} placeholder='Your Bid Amount ?' />
                        <View style={ styles.auctionButtonContainer}>
                            <TouchableOpacity style={ styles.btn2} onPress={()=>bidNow()}>
                                <Text>Bid Now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={ styles.btn3} onPress={()=>setIsShow(false)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>
            </View>
        </ScrollView>
  )
}

export default CompletePost

const styles = StyleSheet.create({
    main: {
    },
    alertText: {
        borderColor: '#5a5a5a',
        padding: 10,
        borderWidth: 1,
        margin: 10,
        borderRadius:20
    },
    auctionButtonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems:'center'
    },
    btn2: {
        padding:10,
        backgroundColor: '#6b8e23',
        borderRadius:20,
        paddingHorizontal:20
    },
    btn3: {
        padding: 10,
        borderRadius:20,
        paddingHorizontal:20,
        backgroundColor:'#c4c4c4'
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