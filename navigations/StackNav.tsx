import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/AuthScreens/Register';
import TabNav from './TabNav';
import Login from '../screens/AuthScreens/Login';

export type RootStackParamList = {
    Register: undefined;
    Dashboard: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


export default function StackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={TabNav} />
        </Stack.Navigator>
    );
}