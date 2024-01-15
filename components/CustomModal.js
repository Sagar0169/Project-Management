import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

const CustomModal = ({ visible, message, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onHide();
      }, 1300); // Adjust the timeout duration as needed

      return () => clearTimeout(timeout);
    }
  }, [visible, onHide]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onHide();
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
});

export default CustomModal;
