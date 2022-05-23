import { StyleSheet, View,Image,Text,TouchableOpacity } from 'react-native'
import React, { useEffect,useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const Header = ({ navigation }) => {
    const [searchComponent, setSearchComponent] = useState(false)

  return (
    <View>
        <View style={styles.topContent}>
            <View style={styles.mainCont}>
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                <Text style={styles.headerText}>Vege Sup</Text>   
            </View>
            <TouchableOpacity style={styles.Touchable}>
                <AntDesign name="search1" onPress={()=>setSearchComponent(!searchComponent)} color="black" size={32} />
            </TouchableOpacity>
        </View>
          {
              searchComponent ? (<TextInput style={styles.Input} placeholder='Search here......' />):null
        }
          <View style={styles.mainCont1}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                  <AntDesign name="bars" size={30} color="black" />
            </TouchableOpacity>
              
            <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                <AntDesign name="home" size={30} color="black" />
            </TouchableOpacity>
              
            <TouchableOpacity onPress={()=>navigation.navigate("CreatePost")}>
                <AntDesign name="gift" size={30} color="black" />
            </TouchableOpacity>
              
            <AntDesign name="shoppingcart" size={30} color="black" />
            
            <TouchableOpacity onPress={()=>navigation.navigate("Notifications")}>
                <AntDesign name="notification" size={30} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Message')}>
                <AntDesign name="message1" size={30} color="black" />
            </TouchableOpacity>
            
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    logo: {
        width:90,
        height: 90,
    },
    headerText: {
        fontSize: 28,
        color: '#59E64C',
        fontWeight: 'bold',
        marginLeft: 10,
    
    },
    Touchable:{
        marginEnd:10
    },
    topContent:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    mainCont: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    icon: {
        marginLeft: 170,
        paddingTop:4, 
    },
    mainCont1: {
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        
    },
    Input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius:10,
        marginHorizontal:10,
        marginBottom:8,
        borderColor: "green",  
        padding:8
    },
})