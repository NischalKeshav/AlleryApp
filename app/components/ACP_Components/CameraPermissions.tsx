import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useCameraPermissions } from 'expo-camera';

const CameraPermissionScreen = ({ onPermissionGranted, onCancel }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Run side-effect after render when permissions are granted
  useEffect(() => {
    if (cameraPermission?.granted) {
      onPermissionGranted();
    }
  }, [cameraPermission?.granted]);

  const handleRequestPermission = async () => {
    await requestCameraPermission();
  };

  if (!cameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Loading camera permissions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cameraPermission.granted) {
    // Returning null is fine since `useEffect` will handle navigation
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera access is required to capture photos for allergy reaction
          detection
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CameraPermissionScreen;
