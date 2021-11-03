import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function Anniversaries(){
    const [anniRemaining, setAnniremaining] = useState("");
    const [person1BdRemaining, setPerson1BdRemaining] = useState(0);
    const [person1Name, setPerson1Name] = useState("Person 1")
    const [person2BdRemaining, setPerson2BdRemaining] = useState(0);
    const [person2Name, setPerson2Name] = useState("Person 2")
    const [halloweenRemaining, setHalloweenRemaining] = useState(0)
    const [valatineRemaining, setValatineRemaining] = useState(0)
    const [christmasRemaining, setChristmasRemaining] = useState(0)
    const [newYearRemaining, setNewYearRemaining] = useState(0)

    const isFocused = useIsFocused();
    useEffect(()=>{
        async function calculateDays()
        {
            try{
                var today = new Date
                today.setHours(0,0,0,0)

                var nextAnni = new Date(await AsyncStorage.getItem("@AnniDate"))        //calculate next anni
                console.log(await AsyncStorage.getItem("@AnniDate"))
                nextAnni.setHours(0,0,0,0)
                nextAnni.setFullYear(nextAnni.getFullYear() + calculateTotalYears(nextAnni));
                setAnniremaining(datediff(today, nextAnni))

                var nextPerson1Bd = new Date(await AsyncStorage.getItem("@Person1DateOfBirth")) //calculate person 1 bd
                nextPerson1Bd.setHours(0,0,0,0)
                nextPerson1Bd.setFullYear(nextPerson1Bd.getFullYear() + calculateTotalYears(nextPerson1Bd));
                nextPerson1Bd.setHours(0,0,0,0)
                setPerson1BdRemaining(datediff(today, nextPerson1Bd))
                setPerson1Name(await AsyncStorage.getItem("@Person1Name"))

                var nextPerson2Bd = new Date(await AsyncStorage.getItem("@Person2DateOfBirth")) //calculate person 2 bd
                nextPerson2Bd.setHours(0,0,0,0)
                nextPerson2Bd.setFullYear(nextPerson2Bd.getFullYear() + calculateTotalYears(nextPerson2Bd));
                nextPerson2Bd.setHours(0,0,0,0)
                setPerson2BdRemaining(datediff(today, nextPerson2Bd))
                setPerson2Name(await AsyncStorage.getItem("@Person2Name"))

                var year = calculateWhichYear(14, 2)       // Calculate for Valatine
                var nextValatineString = year + "/2/14"
                var nextValatine = new Date(nextValatineString)
                nextValatine.setHours(0,0,0,0)
                setValatineRemaining(datediff(today, nextValatine))

                var year = calculateWhichYear(31, 10)       // Calculate for Halloween
                var nextHalloweenString = year + "/10/31"
                var nextHalloween = new Date(nextHalloweenString)
                nextHalloween.setHours(0,0,0,0)
                setHalloweenRemaining(datediff(today, nextHalloween))

                var year = calculateWhichYear(25, 12)       // Calculate for Christmas
                var nextChristmasString = year + "/12/25"
                var nextChristmas = new Date(nextChristmasString)
                nextChristmas.setHours(0,0,0,0)
                setChristmasRemaining(datediff(today, nextChristmas))

                var year = calculateWhichYear(31, 12)       // Calculate for New Year's Eve
                var nextNewYearString = year + "/12/31"
                var nextNewYear = new Date(nextNewYearString)
                nextNewYear.setHours(0,0,0,0)
                setNewYearRemaining(datediff(today, nextNewYear))
            }
            catch(err){
                console.log(err)
            }
        }
        calculateDays()
    },[isFocused])

    function calculateWhichYear(day, month){        //calculate if the coming anniversary is this year or next year

        var today = new Date
        today.setHours(0,0,0,0)
        var year = today.getFullYear();

        if(today.getMonth() + 1 > month){
            year++;
        }
        else if((today.getMonth() + 1 == month)){
            if(today.getDate() > day){
                year++;
            }
        }
        return year;
    }

    function calculateTotalYears(date) {            //how many years we've been together
        var ageDifMs = Date.now() - date;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970 + 1);
    }

    function datediff(first, second) {                  
        return Math.round((second-first)/(1000*60*60*24))
    }

    return(
        <ScrollView>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    {!isNaN(anniRemaining)?
                        <Title style={styles.cardTitle}> {anniRemaining} days before Our Anniversary</Title>:
                        <Title style={styles.cardTitle}> No Data</Title>
                    }
                    <Card.Cover source={require("../Imgs/anniversary.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    {!isNaN(person1BdRemaining)?
                        <Title style={styles.cardTitle}> {person1BdRemaining} days before {person1Name}'s Birthday</Title>:
                        <Title style={styles.cardTitle}> No Data</Title>
                    }
                    <Card.Cover source={require("../Imgs/boybd.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                {!isNaN(person2BdRemaining)?
                    <Title style={styles.cardTitle}> {person2BdRemaining} days before {person2Name}'s Birthday</Title>:
                    <Title style={styles.cardTitle}> No Data</Title>
                }
                    <Card.Cover source={require("../Imgs/girlbd.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    <Title style={styles.cardTitle}> {valatineRemaining} days before Valatine's Days</Title>
                    <Card.Cover source={require("../Imgs/valatine.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    <Title style={styles.cardTitle}> {halloweenRemaining} days before Halloween Day</Title>
                    <Card.Cover source={require("../Imgs/halloween.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    <Title style={styles.cardTitle}> {christmasRemaining} days before Christmas</Title>
                    <Card.Cover source={require("../Imgs/christmas.jpg")} style={styles.cardCover}/>
                </Card>
            </View>
            <View style={styles.cardView}>
                <Card style={styles.card}>
                    <Title style={styles.cardTitle}> {newYearRemaining} days before New Year's Eve</Title>
                    <Card.Cover source={require("../Imgs/newyear.jpg")} style={styles.cardCover}/>
                </Card>
            </View>    
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardView:{
        padding: 5
    },
    card:{
        padding: 10,
        borderRadius: 10,
    },
    cardCover:{
        borderRadius: 30,
        height: 120,
    },
    cardTitle:{
        padding: 5,
        alignSelf: "center",
        fontSize: 18,
        color: "grey"
    }
})