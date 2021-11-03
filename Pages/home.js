import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Overlay } from 'react-native-elements';
import DatePicker from 'react-native-neat-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonOverlay from "../Components/personOverlay";
import { useIsFocused } from '@react-navigation/native';
import { LogBox } from 'react-native';

export default function Home({navigation}){
    const [refresh, setRefresh] = useState(true);       //refresh (mandatory)
    const [showDatePicker, setShowDatePicker] = useState(false);    
    const [dayCount, setDayCount] = useState(0);
    const [anni, setAnni] = useState(0);
    const [displayData, setDisplayData] = useState(0);

    const [countFromZero, setCountFromZero] = useState(false)
    const [YMD, setYMD] = useState(false)               //show as year month day

    const [person1Overlay, setPerson1Overlay] = useState(false);
    const [person2Overlay, setPerson2Overlay] = useState(false);

    const [Person1Img, setPerson1Img] = useState("");
    const [Person1Name, setPerson1Name] = useState("");
    const [Person1DateOfBirth, setPerson1DateOfBirth] = useState("");

    const [Person2Img, setPerson2Img] = useState("");
    const [Person2Name, setPerson2Name] = useState("");
    const [Person2DateOfBirth, setPerson2DateOfBirth] = useState("");

    LogBox.ignoreAllLogs();
    const isFocused = useIsFocused();
    useEffect(() => {
        async function fetchData(){
            try {
                var anniDate = new Date(await AsyncStorage.getItem("@AnniDate"))
                anniDate.setHours(0,0,0,0)
                var today = new Date
                today.setHours(0,0,0,0)
                //console.log("Today = " + today)

                setAnni(anniDate)
                //console.log("Anni = " + anniDate)

                setDisplayData(await AsyncStorage.getItem("@AnniDateChooseDone"))
                //console.log(displayData)

                setCountFromZero(JSON.parse(await AsyncStorage.getItem('@CountFromZero')))

                if(JSON.parse(await AsyncStorage.getItem('@CountFromZero'))){
                    setDayCount(datediff(anniDate, today))
                }
                else{
                    setDayCount((datediff(anniDate, today)) + 1)
                }
                //console.log("Day Count = " + dayCount)
                setYMD(JSON.parse(await AsyncStorage.getItem('@YMD')))

                setPerson1Img(await AsyncStorage.getItem("@Person1Img"))
                setPerson1Name(await AsyncStorage.getItem("@Person1Name"))
                setPerson1DateOfBirth(await AsyncStorage.getItem("@Person1DateOfBirth"))

                setPerson2Img(await AsyncStorage.getItem("@Person2Img"))
                setPerson2Name(await AsyncStorage.getItem("@Person2Name"))
                setPerson2DateOfBirth(await AsyncStorage.getItem("@Person2DateOfBirth"))
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [isFocused, refresh])

    function getFormatedStringFromDays(numberOfDays) {
        var years = Math.floor(numberOfDays / 365);
        var months = Math.floor(numberOfDays % 365 / 30);
        var days = Math.floor(numberOfDays % 365 % 30);

        var yearsDisplay = years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
        var monthsDisplay = months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
        var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
        return yearsDisplay + monthsDisplay + daysDisplay;
    }

    function datediff(first, second) {                  //counted from zero
        return Math.round((second-first)/(1000*60*60*24))
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
    return(
        <View style={styles.container}>
            <ImageBackground source={require("../Imgs/bg0.jpg")} style={styles.bgImg}>
                {/* -----------------------Top View Start----------------------- */}
                {displayData != "true" ? 
                <View style={styles.mainTextView}>
                    <TouchableOpacity onPress={openDatePicker}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Choose Date</Text>
                        </View>
                    </TouchableOpacity>
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
                </View>:
                <View style={styles.mainTextView}>
                    <Text style={styles.text}>Together For</Text>
                    {!YMD?
                        <Text style={[styles.text, styles.daysText]}>{dayCount}</Text>:
                        <Text style={[styles.text, styles.YMD]}>{getFormatedStringFromDays(dayCount)}</Text>
                    }
                    <Text style={styles.text}>{anni.toString().slice(0, 15)}</Text>
                </View>
                }     

                {/* -----------------------Mid View Start----------------------- */}
                <View style = {styles.middleView}>
                </View>

                {/* -----------------------Bottom View Start----------------------- */}
                <View style={styles.bottomView}>
                    <View style={styles.avatarAndName}>
                        <TouchableOpacity onPress={()=> setPerson1Overlay(!person1Overlay)}>
                            {Person1Img == "" || Person1Img == null?
                                <Avatar rounded source={require("../Imgs/default.png")} size={70} avatarStyle={styles.avatar}/>:
                                <Avatar rounded source={{uri: Person1Img}} size={70} avatarStyle={styles.avatar}/>
                            }
                        </TouchableOpacity>
                        <Text style={styles.text}>{Person1Name}</Text>
                        <Overlay isVisible={person1Overlay} onBackdropPress={()=> setPerson1Overlay(!person1Overlay)}>
                            <PersonOverlay image={{uri: Person1Img}} name={Person1Name} dob={Person1DateOfBirth}
                            form="Form1" hide={()=> setPerson1Overlay(!person1Overlay)} navigation={navigation}/>
                        </Overlay>
                    </View>
                    <View style={styles.avatarAndName}>
                        <TouchableOpacity onPress={()=> setPerson2Overlay(!person2Overlay)}>
                            {Person2Img == "" || Person2Img == null?
                                <Avatar rounded source={require("../Imgs/default.png")} size={70} avatarStyle={styles.avatar}/>:
                                <Avatar rounded source={{uri: Person2Img}} size={70} avatarStyle={styles.avatar}/>
                            }
                        </TouchableOpacity>
                        <Text style={styles.text}>{Person2Name}</Text>
                        <Overlay isVisible={person2Overlay} onBackdropPress={()=> setPerson2Overlay(!person2Overlay)}>
                            <PersonOverlay image={{uri: Person2Img}} name={Person2Name} dob={Person2DateOfBirth}
                            form="Form2" hide={()=> setPerson2Overlay(!person2Overlay)} navigation={navigation}/>
                        </Overlay>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    bgImg:{
        flex: 1,
    },
    mainTextView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize: 15,
        color: "white",
    },
    daysText:{
        fontSize: 45,
    },
    YMD:{
        fontSize: 25,
    },
    middleView:{
        flex: 0.5,
    },
    bottomView:{
        flexDirection: "row",
        flex: 0.7,
        justifyContent: "space-around",
    },
    avatarAndName:{
        flex: 1,
        alignItems:"center",
    },
    button:{
        backgroundColor: "#FE70C8",
        padding: 18,
        borderRadius: 30,
    },
    datePicker:{
        backgroundColor: "#FE70C8"
    },
    avatar: {
        borderColor: "white",
        borderWidth: 2,
    }
})