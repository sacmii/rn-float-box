import { ViewStyle } from 'react-native';

export type TFloatingBoxOffset = {
  x: number;
  y: number;
};

export type TInitialProps = {
  visible?: boolean;
  panGestureEnabled?: boolean;
  pinchGestureEnabled?: boolean;
};

export type TBoxProps = {
  minHeightClamp?: number;
  maxHeightClamp?: number;
  minWidthClamp?: number;
  maxWidthClamp?: number;
};

export type TScaleProps = {
  minScaleClamp?: number;
  maxScaleClamp?: number;
};

export type TFloatingBoxProps = {
  height: number;
  width: number;
  initialProps?: TInitialProps;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  maxScale?: number;
  moveAnimationDuration?: number;
  scaleAnimationDuration?: number;
  boxProps?: TBoxProps;
  scaleProps?: TScaleProps;
};

export type TFloatingBoxSize = {
  width: number;
  height: number;
};

export type TFloatingBoxRef = {
  move: (position: TFloatingBoxOffset) => void;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setSizes: (height: number | null, width: number | null) => void;
  getSize: () => TFloatingBoxSize;
  setPanGestureState: (enabled: boolean) => void;
  getPanGestureState: () => boolean;
  setPinchGestureState: (enabled: boolean) => void;
  getPinchGestureState: () => boolean;
};
