import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FloatingBox, TFloatingBoxRef } from 'rn-float-box';
import WindowComponent from './WindowComponent';

const { width: sWidth, height: sHeight } = Dimensions.get('window');

export default function ScreenItem() {
  const floatingBoxRef = React.useRef<TFloatingBoxRef>(null);
  const onVisibilityToggle = () => {
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
  const toggleFullScreen = () => {
    const size = floatingBoxRef?.current?.getSize();
    if (size?.height === sHeight) {
      floatingBoxRef?.current?.setSizes(300, 200);
      floatingBoxRef?.current?.move({
        x: sWidth - 230,
        y: sHeight - 340,
      });
      floatingBoxRef?.current?.setPinchGestureState(true);
      floatingBoxRef?.current?.setPanGestureState(true);
    } else {
      floatingBoxRef?.current?.setSizes(sHeight, sWidth);
      floatingBoxRef?.current?.move({ x: 0, y: 0 });
      floatingBoxRef?.current?.setPinchGestureState(false);
      floatingBoxRef?.current?.setPanGestureState(false);
    }
  };
  const togglePanGesture = () => {
    if (floatingBoxRef?.current?.getPanGestureState()) {
      floatingBoxRef?.current?.setPanGestureState(false);
    } else {
      floatingBoxRef?.current?.setPanGestureState(true);
    }
  };
  const togglePinchGesture = () => {
    if (floatingBoxRef?.current?.getPinchGestureState()) {
      floatingBoxRef?.current?.setPinchGestureState(false);
    } else {
      floatingBoxRef?.current?.setPinchGestureState(true);
    }
  };
  return (
    <View style={[styles.flex, styles.flexOne]}>
      <View style={[styles.flex, styles.flexOne]}>
        <View
          style={[
            styles.flex,
            styles.flexOne,
            styles.bottomAligned,
            styles.buttonStyle,
          ]}
        >
          <Text onPress={onVisibilityToggle}>Toggle Visibility</Text>
          <Text onPress={onToggleSize}>Set Size</Text>
          <Text onPress={toggleFullScreen}>Toggle FullScreen</Text>
          <Text onPress={togglePanGesture}>Toggle Pan</Text>
          <Text onPress={togglePinchGesture}>Toggle Pinch</Text>
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
        <WindowComponent
          onToggleClose={onVisibilityToggle}
          onToggleFullScreen={toggleFullScreen}
        />
      </FloatingBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323a45',
    borderRadius: 10,
  },
  buttonStyle: {
    padding: 50,
  },
  flex: {
    display: 'flex',
  },
  flexOne: {
    flex: 1,
    width: '100%',
  },
  bottomAligned: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
});
