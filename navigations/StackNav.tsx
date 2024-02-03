import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/AuthScreens/Register';
import Login from '../screens/AuthScreens/Login';
import WorkScreens from '../screens/AuthScreens/NextScreens/WorkScreens';
import CvAndProject from '../screens/AuthScreens/NextScreens/CvAndProject';
import TabNav from './TabNav';

export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Work: undefined;
    CvAndProject: undefined
    MainNav: undefined
};

const Stack = createStackNavigator<RootStackParamList>();


export default function StackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }} initialRouteName='Login'>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Kayıt Ol' }} />
            <Stack.Screen name="Work" component={WorkScreens} options={{ title: 'Çalışma Bilgileri' }} />
            <Stack.Screen name="CvAndProject" component={CvAndProject} options={{ title: 'Cv Ve Proje Bilgileri' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Giriş Yap' }} />
            <Stack.Screen name="MainNav" component={TabNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}