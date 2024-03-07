import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Child from '../screens/Child';
import Parent from '../screens/Parent';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Child" component={Child} />
        <Stack.Screen name="Parent" component={Parent} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
