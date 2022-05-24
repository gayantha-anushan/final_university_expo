import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
    CheckRow,
    SwitchRow,
    SliderRow
} from 'react-native-settings-page';


const Settings = ({ navigation }) => {
    return (
      <ReactNativeSettingsPage>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>navigation.navigate("Interface")}>
                    <AntDesign name="arrowleft" size={30}></AntDesign>
                </TouchableOpacity>
                
               <Text style={styles.text}>Settings</Text>
            </View>
            <NavigateRow text='General' iconName='gears' onPressCallback={() => { console.log('onPress') }} />
            <NavigateRow text='Privacy' iconName='user-circle' onPressCallback={() => { console.log('onPress') }} />
            <NavigateRow text='Password' iconName='lock' onPressCallback={() => { console.log('onPress') }} />
            <NavigateRow text='Language' iconName='font' onPressCallback={() => { console.log('onPress') }} />
            <SwitchRow 
                text='Notifications' 
                iconName='bell'
                onPressCallback={() => { console.log('on Body Press (optional)') }}
                _value={false}
                _onValueChange={() => { console.log('switched') }} />
            <SliderRow 
                navigate
                text='Font Size'
                iconName='pencil-square'
                onPressCallback={() => { console.log('on Body Press (optional)') }}
                _color='#000'
                _value={70}
                _min={0}
                _max={100}
                _onValueChange={value => { console.log('value: ' + value) }} />
            <NavigateRow text='LogOut' iconName='sign-out' onPressCallback={() => { console.log('onPress') }} />
            <NavigateRow text='About' iconName='info-circle' onPressCallback={() => { console.log('onPress') }} />
            
              
      </ReactNativeSettingsPage>
      
  )
}

export default Settings

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
})