# Chef's Menu Manager

A React Native mobile application designed to help restaurant chefs easily manage their menu items.

The application was developed for Christoffel, a local restaurant owner who currently manages menu information manually on paper. The goal of this project is to provide a simple and user-friendly mobile solution for managing restaurant menu items.

---

## About the Project

Chef's Menu Manager allows the chef to manage restaurant menu information from an Android mobile device.

Each menu item contains:

- Dish Name
- Description
- Course
- Price

The application is being developed progressively as part of a Portfolio of Evidence (PoE).

---

## Current Version

### Part 2 – First Working Version

The first working version allows the chef to:

- Add new menu items
- View all menu items
- Add multiple menu items
- Automatically update the menu when an item is added
- Select a course from a dropdown menu
- Validate required fields
- Display error messages
- Display confirmation messages
- Display a message when no menu items exist
- Navigate between the Home and Add Menu Item screens

---

## Part 3 – Final Version

The final version builds on Part 2 by introducing additional menu management features, search and filtering functionality, statistics, and improved navigation.

### Menu Management

The chef can:

- Add new menu items
- View all menu items
- Edit existing menu items
- Update dish names, descriptions, courses, and prices
- Delete menu items after confirming the action
- View the total number of menu items

### Search and Filtering

The application provides tools to make it easier to find specific dishes.

- Search menu items by dish name
- Filter menu items by course
- Filter by Starter, Main Course, or Dessert
- Combine a dish-name search with a course filter
- Clear the search and filters to display all menu items
- Display a message when no matching dishes are found

### Menu Statistics

The Menu Statistics screen provides an overview of the restaurant menu, including:

- Total number of menu items
- Average price of menu items
- Number of Starters
- Number of Main Courses
- Number of Desserts
- Visual course breakdown indicators

The statistics are calculated from the menu items currently stored in the application's state.

### Navigation and User Experience

The final version includes:

- Navigation between application screens
- A Home screen with menu management actions
- An Add Menu Item screen
- An Edit Menu Item workflow
- A Menu Statistics screen
- Search and filter controls
- Confirmation before deleting menu items
- Feedback messages for successful additions, updates, and deletions
- Validation to prevent incomplete menu items from being saved
- Consistent colours, buttons, spacing, and typography
- Empty-state messages for menus without items and searches without matching results

---

## Screens

### Home / Menu Screen

The Home screen displays:

- Restaurant Menu Manager title
- Chef information
- Total number of menu items
- Search bar for dish names
- Course filter dropdown
- Clear Search & Filter button
- Existing menu items
- Dish name
- Description
- Course
- Price
- Edit Item button
- Delete button
- Add Menu Item button
- View Menu Statistics button
- Empty-state messages when appropriate

### Add Menu Item Screen

The Add Menu Item screen allows the chef to enter:

- Dish Name
- Description
- Course
- Price

The Course field provides the following options:

- Starter
- Main Course
- Dessert

The screen validates required fields and provides feedback when an item is added.

### Edit Menu Item

The Edit Menu Item workflow allows the chef to:

- Select an existing menu item for editing
- View its current details
- Change the dish name, description, course, and price
- Save the changes
- Return to the Home screen after updating the item

### Menu Statistics Screen

The Menu Statistics screen displays:

- Total menu items
- Average dish price
- Starter count
- Main Course count
- Dessert count
- Course breakdown indicators
- A button to return to the menu

---

## Technologies Used

- React Native
- TypeScript
- Expo
- JavaScript
- React Hooks
- React Navigation
- React Native Picker
- Git and GitHub

---

## Data Handling

Menu items are managed using React state and shared between the relevant screens.

This allows the Home screen and Menu Statistics screen to reflect changes when items are added, updated, or deleted.

**Note:** Unless persistent storage is implemented separately, menu items are held in application state and may be lost when the application is restarted or reloaded.

---

## Project Development

### Part 2 – First Working Version

Focused on implementing the initial Home and Add Menu Item screens, capturing menu item details, displaying multiple items, and providing basic validation and navigation.

### Part 3 – Final Version

Focused on extending the application with editing, updating, deleting, searching, filtering, menu statistics, improved navigation, and user experience refinements.



