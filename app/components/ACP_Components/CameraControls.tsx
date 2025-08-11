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


const CameraControls = ({ onCancel, onCapture, onFlipCamera, isCapturing }) => (
  <View style={controlsStyles.controls}>
    <TouchableOpacity
      style={controlsStyles.cancelControlButton}
      onPress={onCancel}
    >
      <Text style={controlsStyles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[controlsStyles.captureButton, isCapturing && controlsStyles.capturingButton]}
      onPress={onCapture}
      disabled={isCapturing}
    >
      <View style={controlsStyles.captureButtonInner} />
    </TouchableOpacity>

    <TouchableOpacity
      style={controlsStyles.flipButton}
      onPress={onFlipCamera}
    >
      <Text style={controlsStyles.flipButtonText}>Flip</Text>
    </TouchableOpacity>
  </View>
);

const controlsStyles = StyleSheet.create({
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
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CameraControls;