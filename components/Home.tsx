
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    TextInput,
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
    menuItems: MenuItem[];
    onAdd: () => void;
    onEdit: (item: MenuItem) => void;
    onDelete: (id: string) => void;
    onStatistics: () => void;
};

export default function Home({
    menuItems,
    onAdd,
    onEdit,
    onDelete,
    onStatistics,
}: Props) {

    const [searchText, setSearchText] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Search by dish name and filter by course
    const filteredMenuItems = menuItems.filter((item) => {
        const matchesName = item.dishName
            .toLowerCase()
            .includes(searchText.trim().toLowerCase());

        const matchesCourse =
            selectedCourse === "" ||
            item.course === selectedCourse;

        return matchesName && matchesCourse;
    });

    // Confirm before deleting a dish
    const confirmDelete = (item: MenuItem) => {
        Alert.alert(
            "Delete Menu Item",
            `Are you sure you want to delete "${item.dishName}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => onDelete(item.id),
                },
            ]
        );
    };

    // Display each menu item
    const renderMenuItem = ({ item }: { item: MenuItem }) => (
        <View style={styles.menuCard}>

            <View style={styles.cardTop}>
                <View style={styles.details}>
                    <Text style={styles.dishName}>
                        {item.dishName}
                    </Text>

                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>

                <Text style={styles.price}>
                    R{item.price}
                </Text>
            </View>

            <View style={styles.cardBottom}>
                <View style={styles.courseBadge}>
                    <Text style={styles.courseText}>
                        {item.course.toUpperCase()}
                    </Text>
                </View>
            </View>

            {/* Edit and Delete buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEdit(item)}
                >
                    <Text style={styles.editButtonText}>
                        Edit Item
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(item)}
                >
                    <Text style={styles.deleteButtonText}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.menuIcon}>☰</Text>

                <Text style={styles.headerTitle}>
                    Restaurant Menu Manager
                </Text>
            </View>

            {/* Chef information */}
            <View style={styles.chefBar}>
                <Text style={styles.chefIcon}>♙</Text>

                <Text style={styles.chefText}>
                    Chef: Christoffel (Active Kitchen)
                </Text>
            </View>

            {/* Main content */}
            <View style={styles.content}>

                <Text style={styles.totalItems}>
                    Total Menu Items: {menuItems.length}
                </Text>

                {/* Search by dish name */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search dishes by name..."
                    placeholderTextColor="#6B7280"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                />

                {/* Filter by course */}
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>
                        Filter by course
                    </Text>

                    <Picker
                        selectedValue={selectedCourse}
                        onValueChange={(value) =>
                            setSelectedCourse(value)
                        }
                        style={styles.coursePicker}
                    >
                        <Picker.Item
                            label="All Courses"
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

                {/* Clear search and filter */}
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                        setSearchText("");
                        setSelectedCourse("");
                    }}
                >
                    <Text style={styles.clearButtonText}>
                        Clear Search & Filter
                    </Text>
                </TouchableOpacity>

                {/* Menu list and empty states */}
                {menuItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No Menu Items
                        </Text>

                        <Text style={styles.emptyMessage}>
                            Add your first menu item to get started.
                        </Text>
                    </View>
                ) : filteredMenuItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No Matching Dishes
                        </Text>

                        <Text style={styles.emptyMessage}>
                            Try another search or course, or clear
                            your filters.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredMenuItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMenuItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                        keyboardShouldPersistTaps="handled"
                    />
                )}

                {/* Add Menu Item */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAdd}
                >
                    <Text style={styles.addButtonText}>
                        ＋ Add Menu Item
                    </Text>
                </TouchableOpacity>

                {/* Menu Statistics */}
                <TouchableOpacity
                    style={styles.statisticsButton}
                    onPress={onStatistics}
                >
                    <Text style={styles.statisticsButtonText}>
                        View Menu Statistics
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

    header: {
        minHeight: 65,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    menuIcon: {
        fontSize: 25,
        marginRight: 15,
        color: "#18202F",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#18202F",
        flexShrink: 1,
    },

    chefBar: {
        minHeight: 45,
        backgroundColor: "#E5E7EB",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    chefIcon: {
        fontSize: 23,
        marginRight: 10,
        color: "#18202F",
    },

    chefText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#18202F",
        flexShrink: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 5,
    },

    totalItems: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 12,
    },

    searchInput: {
        height: 46,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDE2EA",
        borderRadius: 8,
        paddingHorizontal: 14,
        fontSize: 15,
        color: "#18202F",
        marginBottom: 10,
    },

    filterContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDE2EA",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    },

    filterLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#526071",
        marginTop: 6,
    },

    coursePicker: {
        height: 45,
        width: "100%",
        color: "#18202F",
    },

    clearButton: {
        alignSelf: "flex-end",
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginBottom: 5,
    },

    clearButtonText: {
        color: "#364153",
        fontSize: 13,
        fontWeight: "600",
        textDecorationLine: "underline",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingBottom: 20,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 10,
    },

    emptyMessage: {
        fontSize: 15,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 5,
    },

    list: {
        paddingBottom: 10,
    },

    menuCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDE2EA",
        borderRadius: 8,
        padding: 15,
        marginBottom: 12,
    },

    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    details: {
        flex: 1,
        paddingRight: 10,
    },

    dishName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 5,
    },

    description: {
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 19,
    },

    price: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#18202F",
    },

    cardBottom: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15,
    },

    courseBadge: {
        borderWidth: 1,
        borderColor: "#526071",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },

    courseText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#526071",
    },

    actionButtons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15,
    },

    editButton: {
        flex: 1,
        backgroundColor: "#364153",
        paddingVertical: 11,
        borderRadius: 7,
        alignItems: "center",
    },

    editButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },

    deleteButton: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DC2626",
        paddingVertical: 11,
        borderRadius: 7,
        alignItems: "center",
    },

    deleteButtonText: {
        color: "#DC2626",
        fontSize: 14,
        fontWeight: "bold",
    },

    addButton: {
        minHeight: 48,
        backgroundColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 8,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    statisticsButton: {
        minHeight: 44,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    statisticsButtonText: {
        color: "#364153",
        fontSize: 15,
        fontWeight: "bold",
    },

});
