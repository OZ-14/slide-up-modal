import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import SlideUpModal from './src/SlideUpModal';

export default function App() {
  const DEVICE_HEIGHT = Dimensions.get('window').height;
  const DEVICE_WIDTH = Dimensions.get('window').width;
  const colors = ["#226", "#228", "#448", "#44a", "#44c"]

  return (
    <View style={styles.container}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <SlideUpModal>
        <View style={[styles.modalContainer]}>
          <Text>test slide up modal content</Text>
          <View style={[styles.cardContainer]}>
            {colors.map(color => (
              <View key={`${color}`} style={[styles.colorCard, {backgroundColor: color}]}/>
            ))}
          </View>
        </View>
      </SlideUpModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex:1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  cardContainer: {
    flex: 1
  },
  colorCard: {
    height: 300
  }
});
