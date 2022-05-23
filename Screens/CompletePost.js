import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState} from 'react'
import { getConnection } from '../Connection'

const CompletePost = ({ route }) => {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");


    const { id } = route.params

    useEffect(() => {
        fetch(getConnection() + "/api/posts/singlepost/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])
    
  return (
    <View>
          <Text>id :{ id}</Text>
    </View>
  )
}

export default CompletePost

const styles = StyleSheet.create({
    main: {
    }
})