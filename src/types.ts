import { ViewStyle } from 'react-native';

export type TFloatingBoxPosition = {
  x: number;
  y: number;
};

export type TInitialProps = {
  position: TFloatingBoxPosition;
  visible: boolean;
};

export type TFloatingBoxProps = {
  height: number;
  width: number;
  initialProps?: TInitialProps;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export type TFloatingBoxRef = {
  move: (position: TFloatingBoxPosition) => void;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  scaleToFit: () => void;
  scaleToFull: () => void;
};
