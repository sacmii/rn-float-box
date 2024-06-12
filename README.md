## React Native FloatingBox Component

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
        initialPosition={{ x: 50, y: 50 }}
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

| Prop              | Type      | Description                                            | Default Value |
| ----------------- | --------- | ------------------------------------------------------ | ------------- |
| `height`          | number    | The initial height of the box.                         | None          |
| `width`           | number    | The initial width of the box.                          | None          |
| `initialPosition` | object    | The initial x and y position of the box on the screen. | None          |
| `children`        | ReactNode | The content to be rendered inside the box.             | `null`        |
| `containerStyle`  | object    | Additional styling for the box's container.            | `{}`          |

### API Methods

`FloatingBox` exposes the following methods, which can be accessed using the component's ref:

| Method        | Parameters            | Description                                                               |
| ------------- | --------------------- | ------------------------------------------------------------------------- |
| `move`        | `position: object`    | Move the box to a new position.                                           |
| `setVisible`  | `visibility: boolean` | Set the visibility of the box.                                            |
| `getVisible`  | None                  | Get the current visibility of the box.                                    |
| `scaleToFit`  | None                  | Scale the box to fit within the screen without altering the aspect ratio. |
| `scaleToFull` | None                  | Scale the box to completely fill the screen.                              |

### License

This project is licensed under the [MIT License](https://github.com/sacmii/rn-vertical-slider/blob/master/LICENSE).
