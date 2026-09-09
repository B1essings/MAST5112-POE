import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";


type MenuItem = {
    id: string;
    dishName: string;
    description: string;
    course: string;
    price: string;
};


type Props = {
    onAddItem: (item: MenuItem) => void;
    onCancel: () => void;
};


export default function AddMenuItem({ onAddItem, onCancel }: Props) {

    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [price, setPrice] = useState("");


    const handleAddItem = () => {

        // Check if all fields have been completed
        if (
            dishName.trim() === "" ||
            description.trim() === "" ||
            course === "" ||
            price.trim() === ""
        ) {
            Alert.alert(
                "Missing Information",
                "Please complete all fields before adding the menu item."
            );

            return;
        }


        // Create the new menu item
        const newItem: MenuItem = {
            id: Date.now().toString(),
            dishName: dishName.trim(),
            description: description.trim(),
            course: course,
            price: price.trim(),
        };


        // Add the item
        onAddItem(newItem);


        // Clear the fields
        setDishName("");
        setDescription("");
        setCourse("");
        setPrice("");
    };


    return (
        <View style={styles.container}>

            {/* Header */}

            <View style={styles.header}>

                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Add Menu Item
                </Text>

            </View>


            {/* Form */}

            <View style={styles.form}>

                {/* Dish Name */}

                <Text style={styles.label}>
                    Dish Name
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="e.g. Spicy Pepperoni Pizza"
                    placeholderTextColor="#9AA3B2"
                    value={dishName}
                    onChangeText={setDishName}
                />


                {/* Description */}

                <Text style={styles.label}>
                    Description
                </Text>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Provide a brief description of the ingredients and presentation..."
                    placeholderTextColor="#9AA3B2"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />


                {/* Course */}

                <Text style={styles.label}>
                    Course
                </Text>

                <View style={styles.pickerContainer}>

                    <Picker
                        selectedValue={course}
                        onValueChange={(itemValue) => setCourse(itemValue)}
                        style={styles.picker}
                    >

                        <Picker.Item
                            label="Select Course"
                            value=""
                        />

                        <Picker.Item
                            label="Starter"
                            value="Starter"
                        />

                        <Picker.Item
                            label="Main Course"
                            value="Main Course"
                        />

                        <Picker.Item
                            label="Dessert"
                            value="Dessert"
                        />

                    </Picker>

                </View>


                {/* Price */}

                <Text style={styles.label}>
                    Price
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="R0.00"
                    placeholderTextColor="#9AA3B2"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />


                {/* Required fields message */}

                <Text style={styles.info}>
                    ⓘ All fields are required.
                </Text>


                {/* Save button */}

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleAddItem}
                >

                    <Text style={styles.saveText}>
                        Save Menu Item
                    </Text>

                </TouchableOpacity>


                {/* Cancel button */}

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >

                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },


    /* Header */

    header: {
        height: 65,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#E1E5EA",
    },

    backArrow: {
        fontSize: 28,
        color: "#18202F",
        marginRight: 20,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#18202F",
    },


    /* Form */

    form: {
        padding: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#18202F",
        marginBottom: 7,
        marginTop: 8,
    },


    /* Text inputs */

    input: {
        height: 42,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#18202F",
        marginBottom: 8,
    },

    descriptionInput: {
        height: 82,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingTop: 12,
        fontSize: 14,
        color: "#18202F",
        marginBottom: 8,
    },


    /* Course dropdown */

    pickerContainer: {
        height: 50,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        marginBottom: 8,
        justifyContent: "center",
        paddingBottom: 5,
        overflow: "hidden",
    },

    picker: {
        height: 42,
        width: "100%",
        color: "#18202F",
    },


    /* Information */

    info: {
        color: "#526071",
        fontSize: 13,
        marginTop: 4,
        marginBottom: 25,
    },


    /* Save */

    saveButton: {
        height: 48,
        backgroundColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    saveText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },


    /* Cancel */

    cancelButton: {
        height: 45,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },

    cancelText: {
        color: "#526071",
        fontSize: 15,
        fontWeight: "600",
    },

});