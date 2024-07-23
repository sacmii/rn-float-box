
## React Native FloatingBox Component

<img src="https://github.com/user-attachments/assets/cfdced30-14c9-4b44-8460-c55db7f0fd79" width="250" height="auto"/>

### Overview

`FloatingBox` is a React component designed for use in React Native applications. It leverages the `react-native-gesture-handler` and `react-native-reanimated` libraries to provide an interactive box that can be scaled and moved across the screen using gestures. This component is well-suited for applications where interactive, resizable, and movable UI elements are required, such as photo editors, interactive dashboards, or custom layout editors.

### Features

- **Scalable and Movable**: The `FloatingBox` can be resized using pinch gestures and moved across the screen with pan gestures.
- **Bounds Limiting**: Incorporates logic to prevent the box from scaling beyond the screen size or moving outside the visible area.
- **Customizable**: Allows for custom children to be rendered inside the box and supports customizable styling.

### Installation

To integrate the `FloatingBox` into your project, follow these steps:

1. Ensure you have `react-native-gesture-handler` and `react-native-reanimated` installed in your project. If not, install them using npm or yarn:

   ```bash
   npm install react-native-gesture-handler react-native-reanimated
   ```

   or

   ```bash
   yarn add react-native-gesture-handler react-native-reanimated
   ```

2. Import the `FloatingBox` component into your project file:

   ```tsx
   import FloatingBox from 'rn-float-box';
   ```

### Usage

Here is a basic example of how to use the `FloatingBox` component in a React Native application:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import FloatingBox from 'rn-float-box';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingBox
        height={100}
        width={100}
        initialProps={{ visible: true, panGestureEnabled: true, pinchGestureEnabled: true }}
        containerStyle={{ backgroundColor: 'blue' }}
      >
        <Text>Content goes here</Text>
      </FloatingBox>
    </View>
  );
};

export default App;
```

### Props

The following table lists the props available for the `FloatingBox` component:

| Prop                     | Type               | Description                                            | Default Value |
| ------------------------ | ------------------ | ------------------------------------------------------ | ------------- |
| `height`                 | number             | The initial height of the box.                         | None          |
| `width`                  | number             | The initial width of the box.                          | None          |
| `initialProps`           | `TInitialProps`    | Initial visibility and gesture states.                 | `{}`          |
| `children`               | ReactNode          | The content to be rendered inside the box.             | `null`        |
| `containerStyle`         | ViewStyle          | Additional styling for the box's container.            | `{}`          |
| `maxScale`               | number             | Maximum scale factor for the box.                      | None          |
| `moveAnimationDuration`  | number             | Duration of the move animation in milliseconds.        | 350           |
| `scaleAnimationDuration` | number             | Duration of the scale animation in milliseconds.       | 500           |
| `boxProps`               | `TBoxProps`        | Constraints for box resizing.                          | `{}`          |
| `scaleProps`             | `TScaleProps`      | Constraints for box scaling.                           | `{}`          |

### Initial Props

The `initialProps` prop accepts an object of type `TInitialProps`, which can contain the following properties:

| Property               | Type      | Description                                      | Default Value |
| ---------------------- | --------- | ------------------------------------------------ | ------------- |
| `visible`              | boolean   | Initial visibility of the box.                   | `true`        |
| `panGestureEnabled`    | boolean   | Initial state of the pan gesture.                | `true`        |
| `pinchGestureEnabled`  | boolean   | Initial state of the pinch gesture.              | `true`        |

### Box Props

The `boxProps` prop accepts an object of type `TBoxProps`, which can contain the following properties:

| Property               | Type      | Description                                      | Default Value |
| ---------------------- | --------- | ------------------------------------------------ | ------------- |
| `minHeightClamp`       | number    | Minimum height for the box.                      | `height` / 2  |
| `minWidthClamp`        | number    | Minimum width for the box.                       | `width` / 2   |
| `maxHeightClamp`       | number    | Maximum height for the box.                      | Screen Height |
| `maxWidthClamp`        | number    | Maximum width for the box.                       | Screen Width  |

### Scale Props

The `scaleProps` prop accepts an object of type `TScaleProps`, which can contain the following properties:

| Property               | Type      | Description                                      | Default Value |
| ---------------------- | --------- | ------------------------------------------------ | ------------- |
| `minScaleClamp`        | number    | Minimum scale factor for the box.                | `0.5`         |
| `maxScaleClamp`        | number    | Maximum scale factor for the box.                | `2`           |


### API Methods

`FloatingBox` exposes the following methods, which can be accessed using the component's ref:

| Method                | Parameters                  | Description                                                               |
| --------------------- | --------------------------- | ------------------------------------------------------------------------- |
| `move`                | `position: TFloatingBoxOffset` | Move the box to a new position.                                           |
| `setVisible`          | `visibility: boolean`       | Set the visibility of the box.                                            |
| `getVisible`          | None                        | Get the current visibility of the box.                                    |
| `setSizes`            | `height: number, width: number` | Set the dimensions of the box.                                             |
| `getSize`             | None                        | Get the current dimensions of the box.                                    |
| `setPanGestureState`  | `enabled: boolean`          | Enable or disable the pan gesture.                                        |
| `getPanGestureState`  | None                        | Get the current state of the pan gesture.                                 |
| `setPinchGestureState`| `enabled: boolean`          | Enable or disable the pinch gesture.                                      |
| `getPinchGestureState`| None                        | Get the current state of the pinch gesture.                               |

### Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find a bug or have a feature request. See the [contributing guide](./CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

### License

This project is licensed under the [MIT License](https://github.com/sacmii/rn-vertical-slider/blob/master/LICENSE).
