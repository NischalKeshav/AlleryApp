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


const PhotoPreviewControls = ({ onRetake, onConfirm }) => (
  <View style={previewControlsStyles.buttonContainer}>
    <TouchableOpacity
      style={[previewControlsStyles.actionButton, previewControlsStyles.retakeButton]}
      onPress={onRetake}
    >
      <Text style={previewControlsStyles.retakeButtonText}>Retake</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[previewControlsStyles.actionButton, previewControlsStyles.confirmButton]}
      onPress={onConfirm}
    >
      <Text style={previewControlsStyles.buttonText}>Use Photo</Text>
    </TouchableOpacity>
  </View>
);

const previewControlsStyles = StyleSheet.create({
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PhotoPreviewControls;
