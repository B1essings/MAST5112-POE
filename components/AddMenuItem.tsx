
import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
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
    initialItem?: MenuItem;
};

export default function AddMenuItem({
    onAddItem,
    onCancel,
    initialItem,
}: Props) {
    const isEditing = Boolean(initialItem);

    const [dishName, setDishName] = useState(
        initialItem?.dishName ?? ""
    );

    const [description, setDescription] = useState(
        initialItem?.description ?? ""
    );

    const [course, setCourse] = useState(
        initialItem?.course ?? ""
    );

    const [price, setPrice] = useState(
        initialItem?.price ?? ""
    );

    const handleSaveItem = () => {
        // Check that all fields have been completed.
        if (
            dishName.trim() === "" ||
            description.trim() === "" ||
            course === "" ||
            price.trim() === ""
        ) {
            Alert.alert(
                "Missing Information",
                "Please complete all fields before saving the menu item."
            );
            return;
        }

        // Validate the price.
        const numericPrice = Number(price.trim());

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            Alert.alert(
                "Invalid Price",
                "Please enter a valid price greater than R0.00."
            );
            return;
        }

        // Keep the existing ID when editing.
        const savedItem: MenuItem = {
            id: initialItem?.id ?? Date.now().toString(),
            dishName: dishName.trim(),
            description: description.trim(),
            course,
            price: numericPrice.toFixed(2),
        };

        // Send the item back to App.tsx.
        onAddItem(savedItem);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={onCancel}
                    style={styles.backButton}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    {isEditing ? "Edit Menu Item" : "Add Menu Item"}
                </Text>
            </View>

            {/* Form */}
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.form}
                showsVerticalScrollIndicator={false}
            >
                {/* Dish Name */}
                <Text style={styles.label}>Dish Name</Text>

                <TextInput
                    style={styles.input}
                    placeholder="e.g. Spicy Pepperoni Pizza"
                    placeholderTextColor="#9AA3B2"
                    value={dishName}
                    onChangeText={setDishName}
                    autoCapitalize="words"
                    maxLength={80}
                    accessibilityLabel="Dish name"
                />

                {/* Description */}
                <Text style={styles.label}>Description</Text>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Provide a brief description of the ingredients and presentation..."
                    placeholderTextColor="#9AA3B2"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                    maxLength={300}
                    accessibilityLabel="Dish description"
                />

                {/* Course */}
                <Text style={styles.label}>Course</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={course}
                        onValueChange={(itemValue) => setCourse(itemValue)}
                        style={styles.picker}
                        accessibilityLabel="Select course"
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
                <Text style={styles.label}>Price</Text>

                <TextInput
                    style={styles.input}
                    placeholder="R0.00"
                    placeholderTextColor="#9AA3B2"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                    maxLength={10}
                    accessibilityLabel="Menu item price"
                />

                {/* Required fields message */}
                <Text style={styles.info}>
                    ⓘ All fields are required.
                </Text>

                {/* Save button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveItem}
                    accessibilityRole="button"
                >
                    <Text style={styles.saveText}>
                        {isEditing ? "Save Changes" : "Save Menu Item"}
                    </Text>
                </TouchableOpacity>

                {/* Cancel button */}
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                    accessibilityRole="button"
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
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
        borderBottomWidth: 1,
        borderBottomColor: "#E1E5EA",
    },

    backButton: {
        marginRight: 20,
    },

    backArrow: {
        fontSize: 28,
        color: "#18202F",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#18202F",
    },

    /* Form */
    form: {
        padding: 20,
        paddingBottom: 30,
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
        minHeight: 46,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        paddingHorizontal: 12,
        fontSize: 15,
        color: "#18202F",
        marginBottom: 10,
    },

    descriptionInput: {
        height: 100,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingTop: 12,
        fontSize: 15,
        color: "#18202F",
        marginBottom: 10,
    },

    /* Course dropdown */
    pickerContainer: {
        minHeight: 48,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        marginBottom: 10,
        justifyContent: "center",
        overflow: "hidden",
    },

    picker: {
        height: 48,
        width: "100%",
        color: "#18202F",
    },

    /* Information */
    info: {
        color: "#526071",
        fontSize: 13,
        marginTop: 8,
        marginBottom: 28,
    },

    /* Save */
    saveButton: {
        minHeight: 52,
        backgroundColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    saveText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },

    /* Cancel */
    cancelButton: {
        minHeight: 50,
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
