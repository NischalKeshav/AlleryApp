import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const NAVBAR_CONFIG = {
  title: 'Allery App',
  leftIcon: <Ionicons name="menu" size={24} color="white" />,
  rightIcon: <Ionicons name="search" size={24} color="white" />,
  onLeftPress: () => alert('Menu pressed!'),
  onRightPress: () => alert('Search pressed!'),
};

