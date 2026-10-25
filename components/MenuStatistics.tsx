
import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
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
    onBack: () => void;
};

export default function Statistics({
    menuItems,
    onBack,
}: Props) {

    // Calculate total menu items
    const totalItems = menuItems.length;

    // Calculate average price
    const totalPrice = menuItems.reduce(
        (total, item) => total + (Number(item.price) || 0),
        0
    );

    const averagePrice =
        totalItems > 0 ? totalPrice / totalItems : 0;

    // Count items in each course
    const starters = menuItems.filter(
        (item) => item.course === "Starter"
    ).length;

    const mainCourses = menuItems.filter(
        (item) => item.course === "Main Course"
    ).length;

    const desserts = menuItems.filter(
        (item) => item.course === "Dessert"
    ).length;

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Menu Statistics
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.heading}>
                    Menu Overview
                </Text>

                <Text style={styles.subtitle}>
                    A summary of your restaurant menu.
                </Text>

                {/* Total Items */}
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                        Total Menu Items
                    </Text>

                    <Text style={styles.statNumber}>
                        {totalItems}
                    </Text>

                    <Text style={styles.statDescription}>
                        Dishes currently on your menu
                    </Text>
                </View>

                {/* Average Price */}
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>
                        Average Dish Price
                    </Text>

                    <Text style={styles.statNumber}>
                        R{averagePrice.toFixed(2)}
                    </Text>

                    <Text style={styles.statDescription}>
                        Average price across all menu items
                    </Text>
                </View>

                {/* Course Breakdown */}
                <Text style={styles.sectionTitle}>
                    Items by Course
                </Text>

                <View style={styles.courseCard}>
                    <View style={styles.courseRow}>
                        <Text style={styles.courseName}>
                            Starters
                        </Text>

                        <Text style={styles.courseCount}>
                            {starters}
                        </Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width:
                                        totalItems > 0
                                            ? `${(starters / totalItems) * 100}%`
                                            : "0%",
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.courseRow}>
                        <Text style={styles.courseName}>
                            Main Courses
                        </Text>

                        <Text style={styles.courseCount}>
                            {mainCourses}
                        </Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width:
                                        totalItems > 0
                                            ? `${(mainCourses / totalItems) * 100}%`
                                            : "0%",
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.courseRow}>
                        <Text style={styles.courseName}>
                            Desserts
                        </Text>

                        <Text style={styles.courseCount}>
                            {desserts}
                        </Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width:
                                        totalItems > 0
                                            ? `${(desserts / totalItems) * 100}%`
                                            : "0%",
                                },
                            ]}
                        />
                    </View>
                </View>

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backButtonText}>
                        Back to Menu
                    </Text>
                </TouchableOpacity>

            </ScrollView>
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

    content: {
        padding: 20,
        paddingBottom: 35,
    },

    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#18202F",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: "#697586",
        marginBottom: 22,
    },

    statCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E1E5EA",
    },

    statLabel: {
        fontSize: 15,
        color: "#526071",
        fontWeight: "600",
    },

    statNumber: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#364153",
        marginTop: 10,
        marginBottom: 5,
    },

    statDescription: {
        fontSize: 13,
        color: "#8A94A3",
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#18202F",
        marginTop: 12,
        marginBottom: 14,
    },

    courseCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E1E5EA",
    },

    courseRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 10,
    },

    courseName: {
        fontSize: 15,
        color: "#364153",
        fontWeight: "600",
    },

    courseCount: {
        fontSize: 17,
        color: "#364153",
        fontWeight: "bold",
    },

    progressBackground: {
        height: 8,
        backgroundColor: "#E8EBF0",
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 12,
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#64748B",
        borderRadius: 5,
    },

    backButton: {
        height: 50,
        backgroundColor: "#364153",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },

    backButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },
});
