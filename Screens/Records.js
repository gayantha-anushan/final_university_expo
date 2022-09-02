import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { LineChart,ProgressChart } from 'react-native-chart-kit';



const screenWidth = Dimensions.get("window").width;
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(250, 105, 234, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Summary"] // optional
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(10, 166, 17, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1.0,
  useShadowColorFromDataset: false // optional
};
const data1 = {
  labels: ["Total","Sell"], // optional
  data: [0.4,0.6]
};


const Records = ({ navigation }) => {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Interface")}>
                <AntDesign name="arrowleft" size={30}></AntDesign>
                </TouchableOpacity>
                <Text style={styles.text}>Records</Text>
            </View>
            <View style={styles.des}>
                <Text style={styles.head}>Hi,Amal Srinath</Text>
                <Image style={styles.logo} source={require('../assets/profile.jpg')} />
            </View>
            
            <LineChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
            />
            <View style={styles.card}>
                <View style={styles.htxt}>
                    <Text style={styles.txt}>Full Summary</Text>
                </View>
                <View style={styles.mtxt}>
                    <AntDesign name="linechart" size={32} color="white"/>
                    <Text style={styles.txt}>Total :Rs 2000 </Text>
                </View>
                <View style={styles.mtxt}>
                    <AntDesign name="bank" size={32} color="white"/>
                    <Text style={styles.txt}>Profit :Rs 1000</Text>
                </View>
                <View style={styles.mtxt}>
                    <AntDesign name="checkcircle" size={32} color="white" />
                    <TouchableOpacity>
                        <Text style={styles.txt}>All Activities</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardcont}>
                <View style={styles.card2}>
                    <Text style={{fontSize:15,color:'white',fontWeight:'bold',justifyContent:'flex-start'}}>You Are:</Text>
                    <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold', justifyContent: 'flex-start' }}>Total Profit</Text>
                    <Text style={styles.txtcard}>32%</Text>
                </View>
                <View style={styles.card3}>
                    <ProgressChart
                        data={data1}
                        width={220}
                        height={200}
                        strokeWidth={18}
                        radius={15}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
            </View>
        </View>
  )
}

export default Records

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#a9a9a9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        width:50,
        height: 50,
        display: 'flex',
        borderRadius:30
    },
    des: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent:'space-around'
        
    },
    des1: {
        display:'flex'
    },
    head: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily:'sans-serif-medium'
        
    },
    head1: {
        color: '#6B8E23',
        fontSize: 20,
        fontFamily: 'sans-serif-medium',
        fontWeight:'bold'
    },
    card: {
        backgroundColor: '#4d8aeb',
        borderRadius: 40,
        padding: 20,
        margin: 20,
        
    },
    txt: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
    },
    htxt: {
        alignItems: 'center',
        backgroundColor:'#6B8E23'
    },
    mtxt: {
        flexDirection: 'row',
        margin: 5,
        justifyContent:'center'
        
    },
    card2: {
        backgroundColor: '#6B8E23',
        borderRadius: 30,
        padding: 20,
        margin: 1,
        
    },
    cardcont: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    txtcard: {
        color: 'white',
        fontSize: 45,
        fontWeight:'bold'
    },
    card3: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
        margin: 1,
    
    },
})