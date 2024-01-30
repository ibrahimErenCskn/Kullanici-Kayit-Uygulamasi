import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/MainScreens/Home';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}