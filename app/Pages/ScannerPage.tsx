import AllergyPhotoCapture from '../components/AllergyPhotoCapture';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScannerPage = () => {
  const handlePhotoTaken = (photo) => {
    console.log('Photo captured:', photo);
  };

  const handleCancel = () => {
    console.log('User cancelled photo capture');
  };

  return (
    <AllergyPhotoCapture
      onPhotoTaken={(photo) => handlePhotoTaken(photo)}
      onCancel={handleCancel}
    />
  );
};

export default ScannerPage;
