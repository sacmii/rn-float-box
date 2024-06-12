import React from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { height: sHeight, width: sWidth } = Dimensions.get('window');

const FloatingBox = React.forwardRef<TFloatingBoxRef, TFloatingBoxProps>(
  (
    { height, width, initialPosition, children = null, containerStyle = {} },
    ref
  ) => {
    const visible = useSharedValue<boolean>(true);
    const scale = useSharedValue<TFloatingBoxPosition>({ x: 1, y: 1 });
    const movBegLoc = useSharedValue<TFloatingBoxPosition>(initialPosition);
    const location = useSharedValue<TFloatingBoxPosition>(initialPosition);
    // Gesture for scaling the box
    const scaleGesture = Gesture.Pinch().onChange(
      ({ scale: changeScale = 1, ...rest }) => {
        // Check if scale doesnt go below 1 and above max of screen-width or screen height
        console.log(rest);
        if (changeScale > 1) {
          let scaleHeight = height * changeScale;
          let scaleWidth = width * changeScale;
          if (scaleHeight <= sHeight && scaleWidth <= sWidth) {
            scale.value = { x: changeScale, y: changeScale };
            // Move the box to the center of the screen
            let x = (sWidth - scaleWidth) / 2;
            let y = (sHeight - scaleHeight) / 2;
            location.value = { x, y };
          }
        }
      }
    );
    // Gesture that moves the box
    const moveGesture = Gesture.Pan()
      .onStart(() => {
        movBegLoc.value = location.value;
      })
      .onChange(
        ({
          translationX,
          translationY,
        }: GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >) => {
          // Don't allow the box to go outside the screen
          let x = translationX + movBegLoc.value.x;
          let y = translationY + movBegLoc.value.y;
          location.value = { x, y };
        }
      );
    // Composed gesture for moving the box
    const createComposedGesture = () =>
      Gesture.Simultaneous(scaleGesture, moveGesture);
    // Memoize the composed gesture
    const composedGesture = React.useMemo(createComposedGesture, [
      moveGesture,
      scaleGesture,
    ]);
    // Animated style for the box
    const animatedStyle = useAnimatedStyle(() => {
      let style: ViewStyle = {
        height: scale.value.x * height,
        width: scale.value.y * width,
        transform: [
          { translateX: location.value.x },
          { translateY: location.value.y },
          { scale: visible.value ? 1 : 0 },
        ],
      };
      return style;
    }, [height, width]);
    // Ref handling
    React.useImperativeHandle(ref, () => ({
      move: (position) => {
        location.value = position;
      },
      setVisible: (visibilty: boolean) => {
        visible.value = visibilty;
      },
      getVisible: () => visible.value,
      scaleToFit: () => {
        let fitScale = Math.min(sHeight / height, sWidth / width);
        scale.value = { x: fitScale, y: fitScale };
      },
      scaleToFull: () => {
        let fullY = sWidth / width;
        let fullX = sHeight / height;
        scale.value = { x: fullX, y: fullY };
        // Calculate top left corner
      },
    }));
    // Return the floating box
    return (
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.root, containerStyle, animatedStyle]}>
          {children}
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
