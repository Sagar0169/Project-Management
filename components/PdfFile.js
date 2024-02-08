import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";

const PdfViewerScreen = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isPdfViewerVisible, setPdfViewerVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState("");

  const pickDocument = async () => {
    try {
      console.log("Attempting to pick a document...");
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("Document picked:", result);

      if (result.assets[0].mimeType === "application/pdf") {
        setSelectedDocument(result);
      } else {
        setSelectedDocument(null);
      }
    } catch (err) {
      console.error("Document picking failed", err);
    }
  };

  const openPdfWithDefaultViewer = async () => {
    if (pdfUri) {
      try {
        // Copy the file to the app's cache directory
        const cacheDirectory = `${FileSystem.cacheDirectory}pdfs/`;
        await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
        const destUri = `${cacheDirectory}${selectedDocument.name}`;
        await FileSystem.copyAsync({ from: pdfUri, to: destUri });

        // Use Linking to open the copied PDF file with the default viewer
        Linking.openURL(destUri);
      } catch (error) {
        console.error("Error copying PDF:", error);
      }
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      if (selectedDocument) {
        try {
          const uri = selectedDocument.assets[0].uri;
          const pdfBase64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const pdfDataUri = `data:application/pdf;base64,${pdfBase64}`;

          setPdfViewerVisible(true);
          setPdfUri(uri);
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      }
    };

    loadPdf();
  }, [selectedDocument]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickDocument} style={styles.button}>
        <Text style={styles.buttonText}>Pick a Document</Text>
      </TouchableOpacity>
      {isPdfViewerVisible && selectedDocument && (
        <>
          <Video
            source={{ uri: pdfUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={openPdfWithDefaultViewer} style={styles.openButton}>
            <Text style={styles.buttonText}>Open with Default Viewer</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  openButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PdfViewerScreen;
