import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView,TouchableWithoutFeedback,FlatList,Keyboard ,ScrollView, TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { getConnection } from '../Connection';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyPost from './MyPost'
import { AntDesign } from '@expo/vector-icons';
import { Dialog } from 'react-native-paper';

const ViewPost = ({username,postdate,title,quantity,price,type,image,navigation}) => {
    const [editDialog, setEditDialog] = useState(false);
    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editQuantity, setEditQuantity] = useState("")
    const [editWholeseller, setEditWholeseller] = useState(0)
    const [editLocalSeller, setEditLocalSeller] = useState(0)
    const [editCustomer, setEditCustomer] = useState(0)
    const [editDescription, setEditDescription] = useState("")
    //const [typeName, setTypeName] = useState("")
    //const [isDirect, setIsDirect] = useState(false)
    const renderItem = ({ item }) => <MyPost id={item.id} authorImage={item.authorImage} editDetails={editDetails} username={item.username} image={item.image} postdate={item.date} title={item.title} price={item.price} quantity={item.quantity} type={item.type} />

    const [data, setData] = useState([])
    const [listRefreshing, setListRefreshing] = useState(false)
    useEffect(() => {
        console.log("called")
        loaddata()
    }, [])

    const editDetails = (id) => {
        //Edit details page is herer now
        setEditId(id);
        fetch(getConnection() + "/api/posts/singlepost/" + id, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            }
        }).then((res) => res.json()).then(jsres => {
            setEditTitle(jsres.title)
            setEditQuantity(jsres.quantity+"")
            setEditWholeseller(jsres.price.wholeseller+"")
            setEditLocalSeller(jsres.price.localseller+"")
            setEditCustomer(jsres.price.customer+"")
            setEditDescription(jsres.description)
            setEditDialog(true)
        })
    }

    const completeEdit = () => {
        //complete Edit clicked!
        fetch(getConnection() + "/api/posts/update-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                title: editTitle,
                quantity: editQuantity,
                wholeseller: editWholeseller,
                localseller: editLocalSeller,
                customer: editCustomer,
                description: editDescription,
                id:editId
            })
        }).then((res) => res.text()).then((jsres) => {
            setEditDialog(false);
            loaddata()
        })
    }

    const loaddata = () => {
        setListRefreshing(true)    
        AsyncStorage.getItem("current_profile", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                fetch(getConnection() + '/api/posts/my/' + result, {
                    method: 'GET'
                }).then((response) => response.json()).then((responseJson) => {
                    var datas = []
                    for (var i = 0; i < responseJson.length; i++) {
                        datas.push({
                            id: responseJson[i]._id,
                            authorImage:getConnection() + "/profile/" + responseJson[i].author.image,
                            username: responseJson[i].author.firstname + " " + responseJson[i].author.lastname,
                            date: responseJson[i].date,
                            title: responseJson[i].title,
                            price: responseJson[i].price.customer,
                            quantity: responseJson[i].quantity,
                            image: getConnection() + "/post-img/" + responseJson[i].image
                        })
                    }
                    setData(datas)
                })
            }
        });
    setListRefreshing(false)
            
}
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainArea}>
            <View style={styles.maincont}>
                <TouchableOpacity onPress={()=>navigation.navigate("ViewProfile",{uid:null})}>
                    <AntDesign name="arrowleft" size={30} color="#fff"></AntDesign>
                </TouchableOpacity>
                    <Text style={styles.user}>Your Post</Text>  
                        </View>
            
            <View style={styles.mainCont}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList style={ styles.stylingit} refreshing={listRefreshing} onRefresh={()=>loaddata()} data={data} renderItem={renderItem} keyExtractor={item => item._id} />
                    </TouchableWithoutFeedback>
            </View>
            <Dialog visible={editDialog} onDismiss={()=>setEditDialog(false)}>
                <Dialog.Title>Change Details</Dialog.Title>
                <Dialog.Content>
                    <Text>Title</Text>
                    <TextInput style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} value={editTitle} onChangeText={setEditTitle} placeholder="Your title here..." />
                    <Text>Quantity(Kg)</Text>
                    <TextInput value={editQuantity} onChangeText={setEditQuantity} style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} placeholder="10000" />
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize:16
                    }}>Price</Text>
                    <View style={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection:"row"
                    }}>
                        <View>
                            <Text>WholeSeller</Text>
                            <TextInput value={editWholeseller} onChangeText={setEditWholeseller} style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} placeholder="Wholeseller" />
                        </View>
                        <View>
                            <Text>LocalSeller</Text>
                            <TextInput value={editLocalSeller} onChangeText={setEditLocalSeller} style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} placeholder='Local Seller' />
                        </View>
                        <View>
                            <Text>Customer</Text>
                            <TextInput value={editCustomer} onChangeText={setEditCustomer} style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} placeholder='Customer' />
                        </View>
                    </View>
                    <Text>Description</Text>
                    <TextInput value={editDescription} onChangeText={setEditDescription} multiline={true} style={{
                        borderColor: "#aaa",
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 8,
                        margin:8
                    }} placeholder='Description...'/>
                </Dialog.Content>
                <Dialog.Actions>
                    <TouchableOpacity onPress={()=>completeEdit()} style={{
                        margin: 8,
                        padding: 8,
                        backgroundColor: "#6B8E23",
                        borderRadius: 20,
                        paddingHorizontal:15
                    }}>
                        <Text style={{
                            color:"#fff"
                        }}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setEditDialog(false)} style={{
                        margin: 8,
                        padding: 8,
                        backgroundColor: "#aaa",
                        borderRadius: 20,
                        paddingHorizontal:15
                    }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </Dialog.Actions>
            </Dialog>
            </KeyboardAvoidingView>
  )
}
export default ViewPost

const styles = StyleSheet.create({
    stylingit: {
        marginBottom:150
    },
    mainArea: {
        height:"100%"
    },
    user: {
        marginLeft: 10,
        color:"#fff",
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize:20,
        flexDirection:'row'    
    },
    tab: {
        paddingTop: 5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#40e0d0',
        justifyContent:'flex-start'
        
    },
    maincont: {
        paddingTop: 40,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#6B8E23',
        justifyContent:'flex-start'
    },
    mainCont: {
        paddingTop:4
    }
})