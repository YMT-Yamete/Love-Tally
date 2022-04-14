import React, {useState, useEffect, BackHandler} from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-neat-date-picker';
import CheckBox from '@react-native-community/checkbox';

export default function Settings(){
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [countFromZero, setCountFromZero] = useState(false)
    const [YMD, setYMD] = useState(false)

    useEffect(()=>{
        async function valuesSetter(){
            try{
                setCountFromZero(JSON.parse(await AsyncStorage.getItem('@CountFromZero')))
                console.log("Count From Zero : " + countFromZero)

                setYMD(JSON.parse(await AsyncStorage.getItem('@YMD')))
                console.log("YMD : " + YMD)
            }
            catch(err){
                console.log(err)
            }
        }
        valuesSetter();
    })
    const ConfirmAlert = () => {
        Alert.alert(
            "Warning",
            "Do you really want to reset all data?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Yes", 
                    onPress: async() => {
                        console.log("Done")
                        AsyncStorage.clear()
                        await AsyncStorage.setItem("@Person1Name", "Person 1")
                        await AsyncStorage.setItem("@Person1DateOfBirth", "No Date Of Birth Data")
                        await AsyncStorage.setItem("@Person2Name", "Person 2")
                        await AsyncStorage.setItem("@Person2DateOfBirth", "No Date Of Birth Data")
                        await AsyncStorage.setItem("@SetDone", "true")
                        await AsyncStorage.setItem("@AnniDate", "No Data")
                        //BackHandler.exitApp()
                    }
                }
            ]
        )
    }
    const openDatePicker = () => {
        setShowDatePicker(true)
    }
    
    const onCancel = () => {
        // You should close the modal in here
        setShowDatePicker(false)
    }
    
    const onConfirm = async (date) => {
        // You should close the modal in here
        setShowDatePicker(false)
        
        // Chosen Date String -> Reformat -> Convert to date
        var chosenDateString = (date.getYear() + 1900) + "-"  + (("0" + (date.getMonth() + 1))).substr(-2) +  "-" + ("0" + date.getDate()).substr(-2)
        var anniDate = new Date(chosenDateString)

        //Store in storage
        try {
            await AsyncStorage.setItem("@AnniDate", anniDate.toString())
            await AsyncStorage.setItem("@AnniDateChooseDone", "true")
            console.log(await AsyncStorage.getItem("@AnniDateChooseDone"))
            setRefresh(!refresh)
        }
        catch (err){
            console.log(err)
        }  
    }

    const countFromZeroSetter = async(newValue) => {
        setCountFromZero(newValue)
        try{
            await AsyncStorage.setItem("@CountFromZero", newValue.toString())
        }
        catch (err){
            console.log(err)
        }
    }

    const YMDSetter = async(newValue) => {
        setYMD(newValue)
        try{
            await AsyncStorage.setItem("@YMD", newValue.toString())
        }
        catch (err){
            console.log(err)
        }
    }
    return(
        <ScrollView>
            <TouchableOpacity onPress={openDatePicker}>
                <View style={styles.settingListView}>
                    <Text style={styles.text}>Change Start Date</Text>
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
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.settingListView, styles.checkBoxListView]}>
                    <Text style={styles.checkBoxText}>Count From Zero</Text>
                    <CheckBox
                        tintColors={{ true: '#FE70C8', false: 'grey' }}
                        disabled={false}
                        value={countFromZero}
                        onValueChange={(newValue) => countFromZeroSetter(newValue)}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.settingListView, styles.checkBoxListView]}>
                    <Text style={styles.checkBoxText}>Display As Y/M/D</Text>
                    <CheckBox
                        tintColors={{ true: '#FE70C8', false: 'grey' }}
                        disabled={false}
                        value={YMD}
                        onValueChange={(newValue) => YMDSetter(newValue)}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ConfirmAlert}>
                <View style={styles.settingListView}>
                    <Text style={styles.text}>Reset All Data</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.settingListView}>
                    <Text style={styles.text}>V 1.0.0</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Text></Text>
                <Text style={{alignSelf: "center", color: "grey"}}>Developed by YMT</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    settingListView:{
        padding: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
    },
    checkBoxListView:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        color: "grey",
    },
    checkBoxText: {
        color: "grey",
        top: 6,
    },
})