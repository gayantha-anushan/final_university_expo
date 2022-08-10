import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity,Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import strawberry from '../assets/strawberry.jpg'
import background from '../assets/background-chat.jpg'

const ChatScreen = () => {
  return (
      <View>
          {/* Header Component */}
          <View style={styles.header}>
              <TouchableOpacity style={styles.headerNav}>
                  <EvilIcons name="navicon" size={30} color="black" />
              </TouchableOpacity>
              <Image source={strawberry} style={styles.headerImage} />
              <View style={styles.headerContent}>
                  <Text style={styles.headerTitle}>This is Header</Text>
                  <Text style={styles.headerStatus}>Online / Offline</Text>
              </View>
          </View>
          {/* Messages List */}
          <ImageBackground source={background} style={styles.imageBackgroundStyles}>
              <View style={styles.chatScreenView}>
                  <View>
                        {/* Message Type 1 */}
                        <Ionicons name="ios-checkmark" size={24} color="black" />
                        <Ionicons name="ios-checkmark-done" size={24} color="black" />
                        <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="black" />
                    </View>
                {/* Message Type 2 */}
            </View>
              <View style={styles.typeWriter}>
                  <TextInput multiline={true} style={styles.typeWriterInput} placeholder='type message here' />
                  <TouchableOpacity style={styles.typeWriterButton}>
                    <Ionicons name="md-send-sharp" size={26} color="#6B8E23" />
                </TouchableOpacity>
            </View>
          </ImageBackground>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 5,
        backgroundColor: '#6B8E23',
        paddingHorizontal: 5
    },
    typeWriterButton: {
        padding: 3,
        margin:2
    },
    typeWriterInput: {
        width: Dimensions.get('window').width - 60,
        padding: 4,
        fontSize:18
    },
    imageBackgroundStyles: {
        width: '100%',
        height:"100%"
    },
    chatScreenView: {
        height:Dimensions.get("screen").height - 200
    },
    typeWriter: {
        margin: 4,
        padding: 4,
        borderRadius: 10,
        backgroundColor:'#f5deb3',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems:'center'
    },
    headerImage: {
        height: 50,
        width: 50,
        borderRadius:25
    },
    headerNav: {
        padding: 5,
        margin:5
    },
    headerContent: {
        paddingHorizontal:5
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize:18
    },
    contentContainer: {},
    textContainer:{}
})