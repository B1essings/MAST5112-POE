import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";

export default function Home() {

    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("All Courses");

    const menuItems = [
        {
            id: "1",
            name: "Chicken Pasta",
            description: "Creamy pasta with grilled chicken",
            course: "Main Course",
            price: "R95.00",
        },
        {
            id: "2",
            name: "Garlic Bread",
            description: "Toasted bread with garlic butter",
            course: "Starter",
            price: "R45.00",
        },
        {
            id: "3",
            name: "Chocolate Cake",
            description: "Chocolate cake with chocolate icing",
            course: "Dessert",
            price: "R65.00",
        },
    ];

    const filteredItems = menuItems.filter((item) => {//make sure its ran agaiin through the filter method to check if the item matches the search and selected course

        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase());

        const matchesCourse =
            selectedCourse === "All Courses" ||
            item.course === selectedCourse;

        return matchesSearch && matchesCourse;
    });

    const handleEdit = (name: string) => {
        Alert.alert(
            "Edit Menu Item",
            `You selected ${name} for editing.`
        );
    };

    const handleDelete = (name: string) => {
        Alert.alert(
            "Delete Menu Item",
            `Are you sure you want to delete ${name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Deleted",
                            `${name} has been deleted.`
                        );
                    },
                },
            ]
        );
    };

    const handleAdd = () => {
        Alert.alert(
            "Add Menu Item",
            "Add Menu Item screen will open here."
        );
    };

    const handleStatistics = () => {
        Alert.alert(
            "Menu Statistics",
            "Statistics screen will open here."
        );
    };

    const renderMenuItem = ({ item }: any) => (
        <View style={styles.menuCard}>

            <View style={styles.cardTop}>

                <View style={styles.details}>
                    <Text style={styles.dishName}>
                        {item.name}
                    </Text>

                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>

                <Text style={styles.price}>
                    {item.price}
                </Text>

            </View>

            <View style={styles.cardBottom}>

                <View style={styles.courseBadge}>
                    <Text style={styles.courseText}>
                        {item.course.toUpperCase()}
                    </Text>
                </View>

                <View style={styles.actions}>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEdit(item.name)}
                    >
                        <Text style={styles.editText}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.name)}
                    >
                        <Text style={styles.deleteText}>
                            Delete
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>

                <Text style={styles.menuIcon}>
                    ☰
                </Text>

                <Text style={styles.headerTitle}>
                    Restaurant Menu Manager
                </Text>

            </View>

            {/* Chef information */}
            <View style={styles.chefBar}>

                <Text style={styles.chefIcon}>
                    ♙
                </Text>

                <Text style={styles.chefText}>
                    Chef: Christoffel (Active Kitchen)
                </Text>

            </View>

            {/* Main content */}
            <View style={styles.content}>

                {/* Total items + filter */}
                <View style={styles.topRow}>

                    <Text style={styles.totalItems}>
                        Total Menu Items: {menuItems.length}
                    </Text>

                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {

                            if (selectedCourse === "All Courses") {
                                setSelectedCourse("Starter");
                            } else if (selectedCourse === "Starter") {
                                setSelectedCourse("Main Course");
                            } else if (selectedCourse === "Main Course") {
                                setSelectedCourse("Dessert");
                            } else {
                                setSelectedCourse("All Courses");
                            }

                        }}
                    >
                        <Text style={styles.filterText}>
                            {selectedCourse}  ˅
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Search */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search menu items..."
                    placeholderTextColor="#9AA3B2"
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Menu list */}
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMenuItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />

                {/* Add button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAdd}
                >
                    <Text style={styles.addButtonText}>
                        ＋  Add Menu Item
                    </Text>
                </TouchableOpacity>

                {/* Statistics */}
                <TouchableOpacity
                    onPress={handleStatistics}
                >
                    <Text style={styles.statistics}>
                        Menu Statistics
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
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    menuIcon: {
        fontSize: 25,
        marginRight: 20,
        color: "#18202F",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#18202F",
    },

    /* Chef bar */

    chefBar: {
        height: 45,
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
    },

    /* Content */

    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 18,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    totalItems: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#18202F",
    },

    filterButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D9DEE7",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    filterText: {
        fontSize: 14,
        color: "#4B5563",
    },

    /* Search */

    searchInput: {
        height: 44,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D9DEE7",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 12,
    },

    /* Menu list */

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
        justifyContent: "space-between",
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

    actions: {
        flexDirection: "row",
        gap: 8,
    },

    editButton: {
        backgroundColor: "#F0F2F5",
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 4,
    },

    editText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#18202F",
    },

    deleteButton: {
        backgroundColor: "#F0F2F5",
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 4,
    },

    deleteText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#E11D48",
    },

    /* Add button */

    addButton: {
        height: 52,
        backgroundColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },

    /* Statistics */

    statistics: {
        textAlign: "center",
        color: "#526071",
        fontSize: 15,
        fontWeight: "600",
        textDecorationLine: "underline",
        marginTop: 22,
        marginBottom: 15,
    },

});

//creat own component 
//use map,store the menu items in a state   to update 
//filter method 