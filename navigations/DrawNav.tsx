import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/MainScreens/Home';
import Profile from '../screens/MainScreens/Profile';


const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Ana Sayfa' }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
        </Drawer.Navigator>
    );
}