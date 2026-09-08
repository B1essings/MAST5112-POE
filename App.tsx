import React, { useState } from "react";

import {
    NavigationContainer,
} from "@react-navigation/native";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Home from "./components/Home";
import AddMenuItem from "./components/AddMenuItem";


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
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);


    const addMenuItem = (item: MenuItem) => {

        setMenuItems((currentItems) => [
            ...currentItems,
            item,
        ]);

    };


    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >

                {/* Home Screen */}

                <Stack.Screen name="Home">

                    {(props) => (

                        <Home
                            {...props}
                            menuItems={menuItems}
                            onAdd={() => props.navigation.navigate("AddMenuItem")}
                        />

                    )}

                </Stack.Screen>


                {/* Add Menu Item Screen */}

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

            </Stack.Navigator>

        </NavigationContainer>

    );
}