import React from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  TFloatingBoxOffset,
  TFloatingBoxProps,
  TFloatingBoxRef,
  TFloatingBoxSize,
} from './types';

const { width: sWidth, height: sHeight } = Dimensions.get('window');

const FloatingBox = React.forwardRef<TFloatingBoxRef, TFloatingBoxProps>(
  (
    {
      height,
      width,
      initialProps: {
        visible: initialVisible = true,
        panGestureEnabled: initialPanGesture = true,
        pinchGestureEnabled: initialPinchGesture = true,
      } = {},
      children = null,
      containerStyle = {},
      moveAnimationDuration = 350,
      scaleAnimationDuration = 500,
      boxProps: {
        maxHeightClamp = sHeight,
        minHeightClamp = height / 2,
        maxWidthClamp = sWidth,
        minWidthClamp = width / 2,
      } = {},
      scaleProps: { maxScaleClamp = 2, minScaleClamp = 0.5 } = {},
    },
    ref
  ) => {
    const visible = useSharedValue<boolean>(initialVisible);
    const boxSize = useSharedValue<TFloatingBoxSize>({ width, height });
    const translationX = useSharedValue<number>(0);
    const translationY = useSharedValue<number>(0);
    const prevTranslationX = useSharedValue<number>(0);
    const prevTranslationY = useSharedValue<number>(0);
    const scale = useSharedValue<number>(1);
    const panGesture = useSharedValue<boolean>(initialPanGesture);
    const pinchGesture = useSharedValue<boolean>(initialPinchGesture);
    // Gesture handling
    const pinch = Gesture.Pinch()
      .onUpdate((event) => {
        if (!pinchGesture.value) return;
        scale.value = clamp(
          scale.value * event.scale,
          minScaleClamp,
          maxScaleClamp
        );
        boxSize.value = {
          width: clamp(width * scale.value, minWidthClamp, maxWidthClamp),
          height: clamp(height * scale.value, minHeightClamp, maxHeightClamp),
        };
      })
      .runOnJS(true);
    const pan = Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        if (!panGesture.value) return;
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      })
      .onUpdate((event) => {
        if (!panGesture.value) return;
        translationX.value = prevTranslationX.value + event.translationX;
        translationY.value = prevTranslationY.value + event.translationY;
      })
      .runOnJS(true);
    const createComposedGesture = () => Gesture.Simultaneous(pan, pinch);
    const composedGesture = React.useMemo(createComposedGesture, [pan, pinch]);
    // Animated style for the box
    const animatedStyle = useAnimatedStyle(() => {
      let style: ViewStyle = {
        height: boxSize.value.height,
        width: boxSize.value.width,
      };
      style.transform = [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ];
      if (!visible.value) {
        style.height = 0;
        style.width = 0;
      }
      return style;
    }, [boxSize, visible]);
    // Ref handling
    React.useImperativeHandle(ref, () => ({
      move: (position: TFloatingBoxOffset) => {
        translationX.value = withTiming(position.x, {
          duration: moveAnimationDuration,
        });
        translationY.value = withTiming(position.y, {
          duration: moveAnimationDuration,
        });
      },
      setVisible: (newValue: boolean) => {
        visible.value = newValue;
      },
      getVisible: () => visible.value,
      setSizes: (
        newHeight: number | null = null,
        newWidth: number | null = null
      ) => {
        let changeHeight = newHeight ?? boxSize.value.height;
        let changeWidth = newWidth ?? boxSize.value.width;
        boxSize.value = withTiming(
          { height: changeHeight, width: changeWidth },
          { duration: scaleAnimationDuration }
        );
      },
      getSize: () => boxSize.value,
      setPanGestureState: (enabled: boolean) => {
        panGesture.value = enabled;
      },
      setPinchGestureState: (enabled: boolean) => {
        pinchGesture.value = enabled;
      },
      getPanGestureState: () => panGesture.value,
      getPinchGestureState: () => pinchGesture.value,
    }));
    // Return the floating box
    return (
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.root, containerStyle, animatedStyle]}>
          {visible.value && children}
        </Animated.View>
      </GestureDetector>
    );
  }
);
export default FloatingBox;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});
