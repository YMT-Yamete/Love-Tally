import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";

export default function PersonOverlay({image, name, dob, form, hide, navigation})
{
    const [PersonImg, setPersonImg] = useState("");
    useEffect(()=>{
        async function imgSetter(){
            try {
                if(form == "Form1"){
                    console.log("im in form 1")
                    setPersonImg(await AsyncStorage.getItem("@Person1Img"))
                }
                else if(form == "Form2"){
                    console.log("im in form 2")
                    setPersonImg(await AsyncStorage.getItem("@Person2Img"))
                }
                console.log(await AsyncStorage.getItem("@Person2Img"))
                console.log(PersonImg)
            }
            catch(error) {
                console.log(error)
            }
        }
        imgSetter();
    })
    const openForm1 = () => {
        hide();
        navigation.navigate("Form1")  
    }
    const openForm2 = () => {
        hide();
        navigation.navigate("Form2")  
    }
    return(
        <View>
            {PersonImg == "" || PersonImg == null? 
            <Image style={styles.Img} source={require('../Imgs/default.png')}/>:
            <Image style={styles.Img} source={image}/>
            }
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{dob}</Text>
            <Text></Text>
            {form == "Form1"? 
            <TouchableOpacity onPress ={() => openForm1()} style={styles.edit}>
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>:
            <TouchableOpacity onPress ={() => openForm2()} style={styles.edit}>
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    Img: {
        width: 250,
        height: 250,
    },
    edit:{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    text:{
        fontSize: 18,
        color: "grey",
    }
  });