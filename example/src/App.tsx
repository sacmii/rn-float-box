import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScreenItem from './ScreenItem';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <ScreenItem />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
