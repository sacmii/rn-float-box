import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FloatingBox, FloatingBoxRef } from 'rn-float-box';

export default function ScreenItem() {
  const floatingBoxRef = React.useRef<FloatingBoxRef>(null);
  const onPress = () => {
    let visible = floatingBoxRef?.current?.getVisible();
    floatingBoxRef?.current?.setVisible(!visible);
  };
  const scaleToFit = () => {
    floatingBoxRef?.current?.scaleToFit();
  };
  const scaleToFull = () => {
    floatingBoxRef?.current?.scaleToFull();
  };
  return (
    <View>
      <Text onPress={onPress}>ScreenItem</Text>
      <Text onPress={scaleToFit}>Fit Screen</Text>
      <Text onPress={scaleToFull}>Full Screen</Text>
      <FloatingBox
        ref={floatingBoxRef}
        height={300}
        initialPosition={{ x: 0, y: 0 }}
        width={200}
        containerStyle={styles.container}
      >
        <Text onPress={onPress}>ScreenItem2</Text>
      </FloatingBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
  },
});
