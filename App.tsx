import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import StackNav from './navigations/StackNav';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <StackNav />
    </NavigationContainer>
  );
}
