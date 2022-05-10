import { SafeAreaView, StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React,{useState} from 'react'
import home from '../assets/home.png';
import profile from '../assets/user.png';
import orders from '../assets/clipboard.png';
import contacts from '../assets/contact-book.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';


const Drawer = ({ }) => {
    const [currentTab, setCurrentTab] = useState("Home");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cont}>
                <Image style={styles.image} source={require('../assets/profile.jpg')}>
                </Image>
                <Text style={styles.text}>
                    Amal Srinath
                </Text>
                <TouchableOpacity>
                    <Text style={styles.text1}>View Profile</Text>
                </TouchableOpacity>
                <View>
                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Profile",profile)}
                    {TabButton(currentTab, setCurrentTab, "Orders", orders)}
                    {TabButton(currentTab, setCurrentTab, "Contacts", contacts)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings)}
                    {TabButton(currentTab,setCurrentTab,"Logout",logout)}   
                </View>
            </View>
        </SafeAreaView>
    )
}
const TabButton = (currentTab,setCurrentTab,title,image) => {
    return (
        <TouchableOpacity onPress={() => {
            if (title == "Logout") {
                
            }
            else {
                setCurrentTab(title)
            }
        }}>
            <View style={{
                flexDirection: 'row',
                marginTop: 18,
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab==title ? 'white' : 'transparent',
                borderRadius: 10,
                padding: 20      

            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    tintColor:currentTab==title? "#5359D1" :"white"
                }} source={image}></Image>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color:currentTab==title? "#5359D1" :"white"
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
                    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5359D1',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:50
    },
    cont: {
        justifyContent: 'flex-start',
        padding:20
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
        marginTop:20,
    },
    text1: {
        fontSize: 15,
        color: 'white',
        marginTop: 13,
    },
    textlist: {
        
        
        
    }


});
export default Drawer;