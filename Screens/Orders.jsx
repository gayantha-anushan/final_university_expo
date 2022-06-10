import React , {useState} from 'react';
import{Image,ImageBackground,StyleSheet,View,Text,TextInput, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,ScrollView,Keyboard, ToastAndroid} from 'react-native'
import Order from './Order';
import Header from './Header';
import { useTheme } from 'react-native-paper';
import Bid from '../components/Bid';

const Orders = ({navigation}) => {

    const title = "Orders";
    const { colors } = useTheme();
    const [isOrder, setIsOrder] = useState(true)

    return (
        <View style={styles.ordersContainer}>
            <Header title={title} navigation={navigation} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={()=>setIsOrder(true)} style={{
                    width: '50%',
                    padding: 15,
                    backgroundColor:isOrder ? '#6B8E23':'#a4a4a4'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color:isOrder ? '#fff':'#000'
                    }}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsOrder(false)} style={{
                    width: '50%',
                    padding: 15,
                    backgroundColor:isOrder ? '#a4a4a4':'#6B8E23'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color:isOrder ? '#000':'#fff'
                    }}>Bids</Text>
                </TouchableOpacity>
            </View>
            {
                isOrder ? (
                    <View>
                        <Order />
                        <Order/>
                    </View>
                ) : (
                        <View>
                            <Bid bids={1} />
                            <Bid bids={0} />
                    </View>
                )
            }
        </View>
    ) 
}

const styles = StyleSheet.create({
    ordersContainer : {
        height :'100%'
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#a4a4a4'
    }
})

export default Orders;