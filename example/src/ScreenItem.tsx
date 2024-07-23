import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FloatingBox, TFloatingBoxRef } from 'rn-float-box';

export default function ScreenItem() {
  const floatingBoxRef = React.useRef<TFloatingBoxRef>(null);
  const onPress = () => {
    let visible = floatingBoxRef?.current?.getVisible();
    floatingBoxRef?.current?.setVisible(!visible);
  };
  const onToggleSize = () => {
    let size = floatingBoxRef?.current?.getSize();
    if (size?.height === 840) {
      floatingBoxRef?.current?.setSizes(500, 350);
    } else {
      floatingBoxRef?.current?.setSizes(840, 420);
    }
  };
  return (
    <View style={[styles.flex, styles.flexOne]}>
      <View style={[styles.flex, styles.flexOne]}>
        <View style={[styles.flex, styles.buttonStyle]}>
          <Text onPress={onPress}>Toggle Visibility</Text>
        </View>
        <View
          style={[
            styles.flex,
            styles.flexOne,
            styles.bottomAligned,
            styles.buttonStyle,
          ]}
        >
          <Text onPress={onPress}>Toggle Visibility</Text>
          <Text onPress={onToggleSize}>Set Size</Text>
        </View>
      </View>
      <FloatingBox
        ref={floatingBoxRef}
        height={300}
        initialProps={{
          visible: true,
        }}
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
  buttonStyle: {
    padding: 50,
  },
  flex: {
    display: 'flex',
  },
  flexOne: {
    flex: 1,
  },
  bottomAligned: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
