import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import appRoutes from "./route";
import { saveUserProfile } from '../storage/storage';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    useEffect(() => {
        saveUserProfile();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {appRoutes.map((route) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                        options={{ headerShown: route.header }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}