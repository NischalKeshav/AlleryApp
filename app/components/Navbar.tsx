import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NAVBAR_CONFIG } from '../constants'; // Adjust path if needed
import SideBarMenu from './SideBarMenu';

const Navbar = () => {
  const { title, leftIcon, rightIcon, onLeftPress, onRightPress } = NAVBAR_CONFIG;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View style={styles.container}>
      {leftIcon ? (
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          {leftIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButtonPlaceholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButtonPlaceholder} />
      )}

      <SideBarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  leftButton: {
    padding: 8,
  },
  rightButton: {
    padding: 8,
  },
  leftButtonPlaceholder: {
    width: 40,
  },
  rightButtonPlaceholder: {
    width: 40,
  },
});

export default Navbar;

