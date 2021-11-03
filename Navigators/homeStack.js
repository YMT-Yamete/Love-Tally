import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/home';
import Form1 from '../Pages/form1';
import Form2 from '../Pages/form2';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
      }}/>
      <Stack.Screen name="Form1" component={Form1} options={{
          headerShown: false,
      }}/>
      <Stack.Screen name="Form2" component={Form2} options={{
          headerShown: false,
      }}/>
    </Stack.Navigator>
  );
}