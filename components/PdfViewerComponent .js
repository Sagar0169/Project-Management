// PdfViewerComponent.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const PdfViewerComponent = ({ selectedDocument }) => {
  // Use a PDF viewer library or your own implementation here
  // For example, you can use expo-pdf-reader or react-native-pdf
  console.log("Opened")
  return (
    <Pressable>
      <Text>{selectedDocument.assets[0].uri}</Text>
      {/* Your PDF rendering component goes here */}
    </Pressable>
  );
};

export default PdfViewerComponent;
