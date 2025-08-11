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

// Permission Request Component
const CameraPermissionScreen = ({ onPermissionGranted, onCancel }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleRequestPermission = async () => {
    const result = await requestCameraPermission();
    if (result.granted) {
      onPermissionGranted();
    }
  };

  if (!cameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Loading camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cameraPermission.granted) {
    onPermissionGranted();
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera access is required to capture photos for allergy reaction detection
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={handleRequestPermission}
        >
          <Text style={styles.buttonText}>Enable Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.permissionButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};