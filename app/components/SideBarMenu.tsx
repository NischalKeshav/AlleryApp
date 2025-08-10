import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for a better look

const { width, height } = Dimensions.get('window');

// Define a maximum width for the sidebar to prevent it from getting too wide on web
const MAX_SIDEBAR_WIDTH = 300;

// Calculate the sidebar width: 75% of screen width, but no more than the max
const SIDEBAR_WIDTH = Math.min(width * 0.75, MAX_SIDEBAR_WIDTH);

interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in the sidebar
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // Fade in the overlay
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out the sidebar
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // Fade out the overlay
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // A helper component for each menu item to keep the JSX clean
  const MenuItem = ({ iconName, label, onPress }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={onPress}
      pointerEvents="auto" // Fix for web clicking
    >
      <Icon name={iconName} size={24} color="#f0f0f0" />
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Overlay to dim the background and allow closing on tap outside */}
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View 
            style={[styles.overlay, { opacity: overlayAnim }]} 
            pointerEvents="auto" // Ensure overlay can be tapped
          />
        </TouchableWithoutFeedback>
      )}

      {/* The Sidebar itself */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
        pointerEvents="auto" // Critical fix for web
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
          {/* Close button using an icon for a cleaner look */}
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeButtonContainer} 
            pointerEvents="auto" // Most critical fix
          >
            <Icon name="close-circle-outline" size={30} color="#f0f0f0" />
          </TouchableOpacity>
        </View>

        {/* Sidebar Content */}
        <View style={styles.content}>
          <MenuItem iconName="person-outline" label="Profile" onPress={() => console.log('Profile')} />
          <MenuItem iconName="settings-outline" label="Settings" onPress={() => console.log('Settings')} />
          <MenuItem iconName="help-circle-outline" label="Help" onPress={() => console.log('Help')} />
          {/* Separator for visual grouping */}
          <View style={styles.separator} />
          <MenuItem iconName="log-out-outline" label="Logout" onPress={() => console.log('Logout')} />
          {/* New "Quit Menu" button */}
          <MenuItem iconName="exit-outline" label="Quit Menu" onPress={onClose} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for the dimming effect
    zIndex: 998, // Placed below the sidebar but above other content
    pointerEvents: 'auto', // Ensures overlay can receive touch events
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height, // Sidebar takes full height
    width: SIDEBAR_WIDTH, // Dynamic width with max cap
    backgroundColor: '#1C1C1E', // Darker, more modern background color
    zIndex: 999, // Ensures sidebar is on top of the overlay
    shadowColor: '#000', // Adds a subtle shadow for depth
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    pointerEvents: 'auto', // Critical for web - ensures sidebar accepts pointer events
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50, // More padding for top on mobile
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Subtle separator for the header
    pointerEvents: 'auto', // Ensures header can receive touches
  },
  headerTitle: {
    color: '#f0f0f0', // Light color for title
    fontSize: 22,
    fontWeight: 'bold',
  },
  // New style for the close button's container
  closeButtonContainer: {
    padding: 5, // Add some padding to make the touch area larger and easier to tap
    pointerEvents: 'auto', // Most critical fix - ensures close button works on web
    zIndex: 1000, // Ensures it's above other elements
  },
  content: {
    flex: 1, // Allows content to take available vertical space
    padding: 20,
    paddingTop: 10,
    pointerEvents: 'auto', // Ensures content area accepts touches
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8, // Slightly rounded corners for menu items
    marginVertical: 5,
    paddingHorizontal: 10,
    pointerEvents: 'auto', // Ensures each menu item can be tapped on web
  },
  menuItemText: {
    color: '#f0f0f0',
    fontSize: 18,
    marginLeft: 15, // Space between icon and text
    fontWeight: '500', // Medium font weight
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  }
});

export default SidebarMenu;