import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';

const CustomAlert2 = ({ visible, onClose, onNo, title, message, inputMessage, setInputMessage }) => {



  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.textInpxd}>

</View>


          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onNo()} style={[styles.button, { backgroundColor: '#FF6262' }]}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClose()} style={[styles.button, { backgroundColor: '#657EFF' }]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  textInpxd:{
    flexDirection: 'row',
  }


});

export default CustomAlert2;
