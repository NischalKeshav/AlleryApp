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

import CameraControls from './ACP_Components/CameraControls';
import CameraHeader from './ACP_Components/CameraHeader';
import CameraPermissionScreen from './ACP_Components/CameraPermissions';
import CameraScreen from './ACP_Components/CameraScreen';
import PhotoInstructions from './ACP_Components/PhotoInstructions';
import PhotoPreviewControls from './ACP_Components/PhotoPreviewControls';
import PhotoPreviewScreen from './ACP_Components/PhotoPreviewScreen';

const AllergyPhotoCapture = ({ onPhotoTaken, onCancel }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraType, setCameraType] = useState('back');

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    try {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    } catch (error) {
      console.log('Media library permission error:', error);
      setHasMediaLibraryPermission(false);
    }
  };

  const handleCapture = async (photo) => {
    setIsCapturing(false);
    setCapturedPhoto(photo);
  };

  const handleConfirmPhoto = async () => {
    if (capturedPhoto && onPhotoTaken) {
      // Optionally save to media library
      if (hasMediaLibraryPermission) {
        try {
          await MediaLibrary.saveToLibraryAsync(capturedPhoto.uri);
        } catch (error) {
          console.log('Could not save to media library:', error);
        }
      }
      
      onPhotoTaken(capturedPhoto);
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleCameraCapture = () => {
    setIsCapturing(true);
  };

  // Permission flow
  if (!hasPermission) {
    return (
      <CameraPermissionScreen 
        onPermissionGranted={() => setHasPermission(true)}
        onCancel={onCancel}
      />
    );
  }

  // Photo preview flow
  if (capturedPhoto) {
    return (
      <PhotoPreviewScreen
        photo={capturedPhoto}
        onRetake={handleRetakePhoto}
        onConfirm={handleConfirmPhoto}
      />
    );
  }

  // Camera flow
  return (
    <CameraScreen
      cameraType={cameraType}
      onCapture={handleCapture}
      onCancel={onCancel}
      onFlipCamera={toggleCameraType}
      isCapturing={isCapturing}
    />
  );
};

const styles = StyleSheet.create({
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 20,
  },
  cancelControlButton: {
    padding: 15,
    width: 80,
    alignItems: 'center',
  },
  flipButton: {
    padding: 15,
    width: 80,
    alignItems: 'center',
  },
  flipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  capturingButton: {
    opacity: 0.7,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  instructionContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  retakeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  retakeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
});

export default AllergyPhotoCapture;