import React, {useEffect} from "react";
import MainDrawer from "./Navigators/mainDrawer";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App(){
  LogBox.ignoreLogs(['Reanimated 2']);  //to hide reanimated 2 installation warning
  useEffect(()=>{
    async function resetter(){
      SplashScreen.hide();
      if(await AsyncStorage.getItem("@SetDone") != "true")
      {
        await AsyncStorage.setItem("@Person1Name", "Person 1")
        await AsyncStorage.setItem("@Person1DateOfBirth", "No Date Of Birth Data")
        await AsyncStorage.setItem("@Person2Name", "Person 2")
        await AsyncStorage.setItem("@Person2DateOfBirth", "No Date Of Birth Data")
        await AsyncStorage.setItem("@AnniDate", "No Data")
        await AsyncStorage.setItem("@SetDone", "true")
      }
      console.log(await AsyncStorage.getItem("@AnniDate"))
    }
    resetter();
  })
  return(
    <NavigationContainer>
      <MainDrawer/>
    </NavigationContainer>
  )
}