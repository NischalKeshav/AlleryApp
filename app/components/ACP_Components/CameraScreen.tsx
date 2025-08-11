import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraHeader from './CameraHeader'
import CameraControls from './CameraControls'

const CameraScreen = ({
  cameraType,
  onCapture,
  onCancel,
  onFlipCamera,
  isCapturing
}) => {
  const cameraRef = useRef(null);

  const takePhoto = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
        exif: false,
      });

      onCapture(photo);
    } catch (error) {
      console.error('Photo capture error:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  return (
    <SafeAreaView style={cameraScreenStyles.container}>
      <CameraView
        ref={cameraRef}
        style={cameraScreenStyles.camera}
        facing={cameraType}
      >
        <View style={cameraScreenStyles.overlay}>
          <CameraHeader />
          <CameraControls
            onCancel={onCancel}
            onCapture={takePhoto}
            onFlipCamera={onFlipCamera}
            isCapturing={isCapturing}
          />
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

const cameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CameraScreen;