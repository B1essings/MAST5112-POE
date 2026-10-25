
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
    item: MenuItem;
    onSave: (updatedItem: MenuItem) => void;
    onCancel: () => void;
};

export default function EditMenuItem({
    item,
    onSave,
    onCancel,
}: Props) {
    const [dishName, setDishName] = useState(item.dishName);
    const [description, setDescription] = useState(item.description);
    const [course, setCourse] = useState(item.course);
    const [price, setPrice] = useState(item.price);

    const handleSave = () => {
        if (
            !dishName.trim() ||
            !description.trim() ||
            !course ||
            !price.trim()
        ) {
            Alert.alert(
                "Missing Information",
                "Please complete all fields before saving."
            );
            return;
        }

        const numericPrice = Number(price.trim());

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            Alert.alert(
                "Invalid Price",
                "Please enter a price greater than R0.00."
            );
            return;
        }

        const updatedItem: MenuItem = {
            id: item.id,
            dishName: dishName.trim(),
            description: description.trim(),
            course,
            price: numericPrice.toFixed(2),
        };

        onSave(updatedItem);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Edit Menu Item
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.form}
                keyboardShouldPersistTaps="handled"
            >
                {/* Dish Name */}
                <Text style={styles.label}>Dish Name</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter dish name"
                    placeholderTextColor="#9AA3B2"
                    value={dishName}
                    onChangeText={setDishName}
                />

                {/* Description */}
                <Text style={styles.label}>Description</Text>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Enter dish description"
                    placeholderTextColor="#9AA3B2"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />

                {/* Course */}
                <Text style={styles.label}>Course</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={course}
                        onValueChange={(value) => setCourse(value)}
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
                <Text style={styles.label}>Price</Text>

                <TextInput
                    style={styles.input}
                    placeholder="R0.00"
                    placeholderTextColor="#9AA3B2"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />

                <Text style={styles.info}>
                    ⓘ All fields are required.
                </Text>

                {/* Save Changes */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>
                        Save Changes
                    </Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
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

    header: {
        height: 65,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
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

    form: {
        padding: 20,
        paddingBottom: 30,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#18202F",
        marginTop: 8,
        marginBottom: 7,
    },

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

    pickerContainer: {
        minHeight: 48,
        backgroundColor: "#F1F2F4",
        borderWidth: 1,
        borderColor: "#E0E3E8",
        borderRadius: 7,
        marginBottom: 10,
        overflow: "hidden",
    },

    picker: {
        height: 48,
        width: "100%",
        color: "#18202F",
    },

    info: {
        color: "#526071",
        fontSize: 13,
        marginTop: 8,
        marginBottom: 28,
    },

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
