
import React, { useState } from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import AddMenuItem from "./components/AddMenuItem";
import MenuStatistics from "./components/MenuStatistics";

type MenuItem = {
    id: string;
    dishName: string;
    description: string;
    course: string;
    price: string;
};

type RootStackParamList = {
    Home: undefined;
    AddMenuItem: undefined;
    EditMenuItem: { item: MenuItem };
    MenuStatistics: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const addMenuItem = (item: MenuItem) => {
        setMenuItems((currentItems) => [...currentItems, item]);

        Alert.alert("Success", "Menu item added successfully.");
    };

    const updateMenuItem = (updatedItem: MenuItem) => {
        setMenuItems((currentItems) =>
            currentItems.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );

        Alert.alert("Success", "Menu item updated successfully.");
    };

    const deleteMenuItem = (id: string) => {
        setMenuItems((currentItems) =>
            currentItems.filter((item) => item.id !== id)
        );

        Alert.alert("Deleted", "Menu item deleted successfully.");
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home">
                    {(props) => (
                        <Home
                            menuItems={menuItems}
                            onAdd={() => props.navigation.navigate("AddMenuItem")}
                            onEdit={(item) =>
                                props.navigation.navigate("EditMenuItem", { item })
                            }
                            onDelete={deleteMenuItem}
                            onStatistics={() =>
                                props.navigation.navigate("MenuStatistics")
                            }
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="AddMenuItem">
                    {(props) => (
                        <AddMenuItem
                            onAddItem={(item) => {
                                addMenuItem(item);
                                props.navigation.goBack();
                            }}
                            onCancel={() => props.navigation.goBack()}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="EditMenuItem">
                    {(props) => (
                        <AddMenuItem
                            initialItem={props.route.params.item}
                            onAddItem={(item) => {
                                updateMenuItem(item);
                                props.navigation.goBack();
                            }}
                            onCancel={() => props.navigation.goBack()}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="MenuStatistics">
                    {(props) => (
                        <MenuStatistics
                            menuItems={menuItems}
                            onBack={() => props.navigation.goBack()}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
