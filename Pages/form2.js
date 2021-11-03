import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableOpacityBase } from "react-native";
import { Avatar } from 'react-native-elements';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-neat-date-picker';
import * as yup from 'yup';

export default function Form2({navigation}){
    const [imgPath, setImgPath] = useState();
    const [name, setName] = useState("Enter Name");
    const [dob, setDob] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(()=>{
        async function dataSetter(){
            setImgPath(await AsyncStorage.getItem("@Person2Img"))
            setName(await AsyncStorage.getItem("@Person2Name"))
            setDob(await AsyncStorage.getItem("@Person2DateOfBirth"))
        }
        dataSetter()
    },[])
    const saveImg = async (image) => {
        try{
            await AsyncStorage.setItem("@Person2Img", image)
        }
        catch(error){
            console.log(error)
        }
        setImgPath(image)
    }
    const saveName = async (values) => {
        try{
            console.log(values.name);
            if(values.name != null && values.name != '')
            {
                setName(values.name)
                await AsyncStorage.setItem("@Person2Name", values.name)
            }
            navigation.navigate("Home")
        }
        catch(error){
            console.log(error)
        }
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }
    
    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = async (date) => {
        setShowDatePicker(false)

        var chosenDateString = (date.getYear() + 1900) + "-"  + (("0" + (date.getMonth() + 1))).substr(-2) +  "-" + ("0" + date.getDate()).substr(-2)
        var dob = new Date(chosenDateString)
        //Store in storage
        try {
            setDob(dob.toString().slice(0,15));
            await AsyncStorage.setItem("@Person2DateOfBirth", dob.toString().slice(0,15))
        }
        catch (err){
            console.log(err)
        }  
      }

    const ValidationSchema = yup.object().shape({
    name: yup
        .string()
        .max(10, "Name should not exceed 10 characters.")
    })

    return(
        <View style={styles.container}>
            <View style={styles.avatarView}>
                <TouchableOpacity onPress={()=>{ImagePicker.openPicker({
                            width: 300,
                            height: 400,
                            cropping: true
                        }).then(image => {
                            saveImg(image.path)
                        }).catch(error=>{
                            console.log(error)
                        })
                    }}>
                    {imgPath == null?
                    <Avatar rounded source={require("../Imgs/default.png")} size={150} />:
                    <Avatar rounded source={{ uri: imgPath }} size={150} />}
                </TouchableOpacity>
            </View>

            <View style ={styles.formView}>
                <Formik
                    initialValues={{ name: ''}}
                    onSubmit={values => saveName(values)}>
                    {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            style={styles.textInput}
                            placeholder={name}
                        />
                        <Text style={{ color: 'red', marginHorizontal: 15 }}>{touched.name && errors.name}</Text>

                        <View style={styles.dobView}>
                            <Text style={{alignSelf: "center"}}>Date of Birth : </Text>
                            <View>
                                <TouchableOpacity style={styles.chooseDob} onPress={openDatePicker}>
                                    <Text style={styles.text}>Choose Date Of Birth</Text>
                                </TouchableOpacity>
                                <Text style={styles.dobText}>{dob}</Text>
                            </View>
                        </View>
                        <DatePicker
                            isVisible={showDatePicker}
                            mode={'single'}
                            onCancel={onCancel}
                            onConfirm={onConfirm}
                            colorOptions= {{
                                headerColor: "#FE70C8",
                                confirmButtonColor: "#FE70C8",
                                weekDaysColor: "#FE70C8",
                                selectedDateBackgroundColor: "#FE70C8"
                            }}
                        />
                        <Text></Text>

                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.text}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    avatarView:{
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    formView:{
        flex: 2,
    },
    textInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
        marginHorizontal: 15,
    },
    chooseDob:{
        backgroundColor: "#AEAAAD",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        alignSelf: "center"
    },
    dobView:{
        flexDirection: "row",
        padding: 20,
    },
    dobText:{
        alignSelf: "center"
    },
    button:{
        backgroundColor: "#FE70C8",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
    },
    text:{
        fontSize: 15,
        color: "white",
        alignSelf: "center"
    },
})