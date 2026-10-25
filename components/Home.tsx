
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";

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

                {/* Menu list */}
                {menuItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No Menu Items
                        </Text>

                        <Text style={styles.emptyMessage}>
                            No menu items have been added yet.
                        </Text>

                        <Text style={styles.emptyMessage}>
                            Add your first menu item to get started.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={menuItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMenuItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                    />
                )}

                {/* Main action buttons */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAdd}
                >
                    <Text style={styles.addButtonText}>
                        ＋ Add Menu Item
                    </Text>
                </TouchableOpacity>

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
        height: 65,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
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
        flexShrink: 1,
    },

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
        flexShrink: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 27,
        paddingTop: 25,
        paddingBottom: 5,
    },

    totalItems: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 15,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
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
        minHeight: 50,
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
        minHeight: 46,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    statisticsButtonText: {
        color: "#364153",
        fontSize: 15,
        fontWeight: "bold",
    },
});
