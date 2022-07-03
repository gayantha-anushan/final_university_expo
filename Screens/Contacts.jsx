import React , {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native';
import Header from './Header';
import Contact from './Contact';
import Connection  from '../Connection';
import UserContext from '../Context/UserContext';

const Contacts = ({navigation}) => {

    const {userData} = React.useContext(UserContext);

    const title = "Contacts";

    const [contacts , setContacts] = React.useState([]);

    React.useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
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
            }).catch((error) => {
                console.log(error);
            })
        })
    } , []);

    return (
        <View style={styles.ContactsContainer}>
            <Header title={title} navigation={navigation} />
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
    } 
})

export default Contacts;