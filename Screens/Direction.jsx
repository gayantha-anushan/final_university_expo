import React,{useState} from 'react'
import{Image,ImageBackground,StyleSheet,View,Text, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import Connection from '../Connection'
import {TextInput} from 'react-native-paper'
import UserContext from '../Context/UserContext';
import MapView from 'react-native-maps';
import {Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { Avatar, Button, Card, Title, Paragraph ,Dialog, Portal  , Provider} from 'react-native-paper';
import { getConnection } from '../Connection';
import MapViewDirections from 'react-native-maps-directions';

const Direction = ({navigation , route}) => {

    const {sellerId} = route.params;

    const [location , setLocation] = useState({
        latitude:80.0457822,
        longitude:80.2146449,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      const [destination , setDestination] = useState({});

      const [directions , setDirections] = useState(false);

      const getLocation = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted'){
            return;
        } else {
            const userLocation = await Location.getCurrentPositionAsync();
            setLocation({
                latitude : userLocation.coords.latitude,
                longitude : userLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }

    const makeDirections = async () => {
        console.log(destination);
        setDirections(true);
    }

      React.useEffect(() => {
        const unsybscribe = navigation.addListener('focus', () => {
            getLocation();
            fetch(Connection.getConnection() + '/api/auth/get-profile/' + sellerId , {
                method : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'token': authCode,
                },
            }).then((result) => result.json()).then((jres) => {
                setDestination({
                    latitude : jres.latitude,
                    longitude : jres.longitude,
                })
            }).catch((error) => {
                console.log(error);
            });
        })
        console.log("USe Effext Called");
    }, [])

    


    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude:80.0457822,
                    longitude:80.2146449,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude:location.latitude,
                    longitude:location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                    <Marker
                        coordinate={{
                            latitude:location.latitude,
                            longitude:location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    ></Marker>
                    {
                        destination.latitude && destination.longitude ? (
                            <Marker
                                coordinate={{
                                    latitude:destination.latitude,
                                    longitude:destination.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            ></Marker>
                        ) : null
                    }
                    {
                        directions ? (
                            <MapViewDirections
                                lineDashPattern={[0]}
                                strokeWidth={5}
                                strokeColor="red"
                                origin={location}
                                destination={destination}
                                apikey='AIzaSyCntH5jS8tK4eyzF1CQDYbxeiP3UdHY5gk'
                            />
                        ) : null
                    }
                </MapView>
                <View style={styles.btnContainer}>
                    <Button onPress={makeDirections}>Make The Directions</Button>
                </View>
        </View>
    )
}

export default Direction;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    btnContainer : {
        position : 'absolute',
        width : '90%',
        backgroundColor : 'white',
        elevation : 4,
        padding : 8,
        borderRadius : 8,
        top : 25
    }
  });

  // latitude:6.0457822
  //longitude:80.2146449