import { ViewStyle } from 'react-native';

export type TFloatingBoxOffset = {
  x: number;
  y: number;
};

export type TInitialProps = {
  visible?: boolean;
};

export type TFloatingBoxProps = {
  height: number;
  width: number;
  initialProps?: TInitialProps;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  maxScale?: number;
};

export type TFloatingBoxSize = {
  width: number;
  height: number;
};

export type TFloatingBoxRef = {
  move: () => void;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setSizes: (height: number | null, width: number | null) => void;
  getSize: () => TFloatingBoxSize;
};
