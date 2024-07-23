import React from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TFloatingBoxProps, TFloatingBoxRef, TFloatingBoxSize } from './types';

const { width: sWidth, height: sHeight } = Dimensions.get('window');

const FloatingBox = React.forwardRef<TFloatingBoxRef, TFloatingBoxProps>(
  (
    {
      height,
      width,
      initialProps: { visible: initialVisible = true } = {},
      children = null,
      containerStyle = {},
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
    // Gesture handling
    const pinch = Gesture.Pinch()
      .onUpdate((event) => {
        scale.value = clamp(scale.value * event.scale, 0.5, 2);
        boxSize.value = {
          width: clamp(width * scale.value, width / 2, sWidth),
          height: clamp(height * scale.value, height / 2, sHeight),
        };
      })
      .runOnJS(true);
    const pan = Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      })
      .onUpdate((event) => {
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
      move: () => {},
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
          { duration: 500 }
        );
      },
      getSize: () => boxSize.value,
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
