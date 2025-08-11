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
import PhotoInstructions from './PhotoPreviewControls';
import PhotoPreviewControls from './PhotoPreviewControls';


const PhotoPreviewScreen = ({ photo, onRetake, onConfirm }) => (
  <SafeAreaView style={previewScreenStyles.container}>
    <View style={previewScreenStyles.previewContainer}>
      <Image
        source={{ uri: photo.uri }}
        style={previewScreenStyles.previewImage}
      />
      <PhotoInstructions />
      <PhotoPreviewControls
        onRetake={onRetake}
        onConfirm={onConfirm}
      />
    </View>
  </SafeAreaView>
);

const previewScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
});

export default PhotoPreviewScreen;