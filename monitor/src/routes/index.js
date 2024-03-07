import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Child from '../screens/Child';
import Parent from '../screens/Parent';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Onboard">
        <Stack.Screen name="Child" component={Child} />
        <Stack.Screen name="Parent" component={Parent} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoard" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
