import { StyleSheet, View,Image,Text,TouchableHighlight,TouchableOpacity } from 'react-native'
import React, { useEffect,useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const Header = ({ navigation }) => {
    const [searchComponent, setSearchComponent] = useState(false)

  return (
    <View>
        <View style={styles.topContent}>
              <View style={styles.mainCont}>
                  <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                      <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                      </TouchableOpacity>
                  <View style={styles.htext}>
                      <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                          <Text style={styles.headerText}>Vege Sup</Text>  
                          </TouchableOpacity>
                    </View>
                    
              </View>
              
            <TouchableOpacity style={styles.Touchable}>
                <AntDesign name="search1" onPress={()=>setSearchComponent(!searchComponent)} color="black" size={32} />
            </TouchableOpacity>
        </View>
          {
              searchComponent ? (<TextInput style={styles.Input} placeholder='Search here......' />):null
        }
          <View style={styles.mainCont1}>
            <TouchableHighlight onPress={()=>navigation.openDrawer()} activeOpacity={0.2} underlayColor='#6B8E23'>
                  <Image style={styles.icon} source={require('../assets/application.png')} />
            </TouchableHighlight>
              
              <TouchableHighlight onPress={() => navigation.navigate("Interface")} activeOpacity={0.2} underlayColor='red' style={{backgroundColor:'#6B8E23'}}>
                <Image style={styles.icon} source={require('../assets/home-1.png')} />
            </TouchableHighlight>
              
            <TouchableOpacity onPress={()=>navigation.navigate("CreatePost")}>
                <Image style={styles.icon} source={require('../assets/add.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("Cart")}> 
                <Image style={styles.icon} source={require('../assets/add-cart.png')} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Notifications")}>
                <Image style={styles.icon} source={require('../assets/notification.png')} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Message')}>
                <Image style={styles.icon} source={require('../assets/chat.png')} />
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
        color: '#6B8E23',
        fontWeight: 'bold',
    },
    htext: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent:'center'
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
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        paddingTop: 4, 
        
    },
    mainCont1: {
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingBottom:10
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