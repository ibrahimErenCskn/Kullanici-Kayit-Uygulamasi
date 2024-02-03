import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/MainScreens/Home';
import Profile from '../screens/MainScreens/Profile';
import DrawerNav from './DrawNav';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator screenOptions={{ headerShadowVisible: false }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => (
                    <AntDesign name="home" size={24} color="black" />
                )
                , title: 'Ana Sayfa'
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                )
                , title: 'Profil'
            }} />
            <Tab.Screen name="Drawer" component={DrawerNav} options={{
                tabBarIcon: () => (
                    <AntDesign name="menuunfold" size={24} color="black" />
                )
                , title: 'Drawer'
            }} />
        </Tab.Navigator>
    );
}