import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './homeStack';
import Anniversaries from '../Pages/anniversaries';
import Settings from '../Pages/settings';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions = {{headerStyle:{
        backgroundColor: "#FE70C8"},
        headerTintColor: "white"
        }}>
      <Drawer.Screen name="HomeStack" component={HomeStack} options ={{
        title: "Home"
      }}/>
      <Drawer.Screen name="Anniversaries" component={Anniversaries} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}