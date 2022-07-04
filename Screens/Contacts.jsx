import React , {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native';
import Header from './Header';
import Contact from './Contact';
import Connection  from '../Connection';
import UserContext from '../Context/UserContext';
import { Button } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Contacts = ({navigation}) => {

    const {userData} = React.useContext(UserContext);

    const title = "Contacts";

    const [contacts , setContacts] = React.useState([]);
    const [mode , setMode] = React.useState(true);
    const [animating , setAnimating] = React.useState(true);

    React.useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            setMode(true);
            fetch(Connection.getConnection() + "/api/sales/successsales/sellercontact/"+userData.user , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'token': authCode,
                }
            }).then((result) => result.json()).then((jres) => {
                var array = [];
                jres.map(item => {
                    array = array.concat(item);
                })
                setContacts(array);
                setAnimating(false);
            }).catch((error) => {
                console.log(error);
            })
        })
    } , []);


    const getSellerContacts = async () => {
        setAnimating(true);
        setMode(true);
        fetch(Connection.getConnection() + "/api/sales/successsales/sellercontact/"+userData.user , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            }
        }).then((result) => result.json()).then((jres) => {
            var array = [];
            jres.map(item => {
                array = array.concat(item);
            })
            setContacts(array);
            setAnimating(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const getBuyerContacts = async () => {
        setAnimating(true);
        setMode(false);
        fetch(Connection.getConnection() + "/api/sales/successsales/"+userData.user , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'token': authCode,
            }
        }).then((result) => result.json()).then((jres) => {
            var array = [];
            jres.map(item => {
                array = array.concat(item);
            })
            setContacts(array);
            setAnimating(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <View style={styles.ContactsContainer}>
            <Header title={title} navigation={navigation} />
            <View style={styles.buttonBar}>
            <Button icon="download" mode={mode ? 'contained' : 'outlined'} onPress={getSellerContacts}>
                Seller Contacts
            </Button>
            <Button icon="download" mode={!mode ? 'contained' : 'outlined'} onPress={getBuyerContacts}>
                Buyer Contacts
            </Button>
            </View>
            <View style={{marginTop : 25}}>
                <ActivityIndicator animating={animating}/>
            </View>
            {
                contacts.map(contact => {
                    return <Contact 
                            key={contact._id}
                            firstName={contact.firstname}
                            lastName={contact.lastname}
                            id={contact._id}
                            type={contact.type}
                            navigation={navigation}
                            />
                })
            }
        </View>
    ) 
}

const styles = StyleSheet.create({
    ContactsContainer : {
        height :'100%'
    } ,
    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop : 10
    }
})

export default Contacts;