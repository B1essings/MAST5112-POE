import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
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
};

export default function Home({ menuItems, onAdd }: Props) {

    const renderMenuItem = ({ item }: { item: MenuItem }) => (
        <View style={styles.menuCard}>

            {/* Dish name and price */}
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

            {/* Course */}
            <View style={styles.cardBottom}>

                <View style={styles.courseBadge}>
                    <Text style={styles.courseText}>
                        {item.course.toUpperCase()}
                    </Text>
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

                {/* Total menu items */}
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


                {/* Add Menu Item button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAdd}
                >

                    <Text style={styles.addButtonText}>
                        ＋  Add Menu Item
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
        paddingHorizontal: 27,
        paddingTop: 35,
    },

    totalItems: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 15,
    },


    /* Empty message */

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 80,
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


    /* Course */

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


    /* Add button */

    addButton: {
        height: 52,
        backgroundColor: "#364153",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },

});