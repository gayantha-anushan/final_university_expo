import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react'
import home from '../assets/home.png';
import profile from '../assets/user.png';
import orders from '../assets/clipboard.png';
import contacts from '../assets/contact-book.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import stocks from '../assets/risk.png';
import records from '../assets/medical-record.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Connection from '../Connection'

const Drawer = (props) => {
    const [currentTab, setCurrentTab] = useState("Home");
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")

    useEffect(() => {
      AsyncStorage.getItem("auth_code", (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
                fetch(Connection.getConnection() + "/api/auth/profile-data", {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        token:result
                    })
                }).then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson);
                    setImage(Connection.getConnection() + "/profile/" + responsejson.data.image);
                    setName(responsejson.data.firstname + " " + responsejson.data.lastname)
                }).catch((error) => {
                    console.log(error);
                })
            }
        })
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.cont}>
                {
                    image?(<Image style={styles.image} source={{uri:image}}>
                </Image>):null
                }
                <Text style={styles.text}>
                    { name}
                </Text>
                <View>
                    {TabButton(currentTab, setCurrentTab, "Home", home, props.navigation)}
                    {TabButton(currentTab, setCurrentTab, "Profile", profile,props.navigation)}
                    {TabButton(currentTab, setCurrentTab, "Orders", orders,props.navigation)}
                    {TabButton(currentTab,setCurrentTab,"Contacts",contacts,props.navigation)}
                    {TabButton(currentTab, setCurrentTab, "Stocks", stocks ,props.navigation)}
                    {TabButton(currentTab, setCurrentTab, "Records", records)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings,props.navigation)}
                    {TabButton(currentTab, setCurrentTab, "Logout", logout,props.navigation)}
                </View>
            </View>
        </View>
    )
}
const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
    return (
        <TouchableOpacity onPress={() => {
            switch (title) {
                case "Home":
                    navigation.navigate("Interface");
                    setCurrentTab("Home")
                    break;
                case "Profile":
                    navigation.navigate("ViewProfile", { uid: null });
                    setCurrentTab("Profile")
                    break;
                case "Orders":
                    navigation.navigate("Orders");
                    setCurrentTab("Orders")
                    break;
                case "Contacts":
                    navigation.navigate("Contacts");
                    break;
                case "Stocks":
                    navigation.navigate("Stock");
                    break;
                case "Settings":
                    navigation.navigate("Settings");
                    setCurrentTab("Settings")
                    break;
                case "Logout":
                    AsyncStorage.clear();
                    navigation.navigate("Login");
                    setCurrentTab("Logout")
                    break;
            }
        }}>
            <View style={{
                flexDirection: 'row',
                marginTop: 18,
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                borderRadius: 10,
                padding: 20

            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    tintColor: currentTab == title ? "#6b8e23" : "white"
                }} source={image}></Image>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#6b8e23" : "white"
                }}>{title}</Text>
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6b8e23',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 50
    },
    cont: {
        justifyContent: 'flex-start',
        padding: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    text1: {
        fontSize: 15,
        color: 'white',
        marginTop: 13,
    },
});
export default Drawer;