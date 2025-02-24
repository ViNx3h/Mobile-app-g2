import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import appRoutes from "./route";


const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {appRoutes.map((route) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                        options={{headerShown: route.header}}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}