type TFloatingBoxPosition = {
  x: number;
  y: number;
};

type TFloatingBoxProps = {
  height: number;
  width: number;
  initialPosition: TFloatingBoxPosition;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
};

type TFloatingBoxRef = {
  move: (position: TFloatingBoxPosition) => void;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  scaleToFit: () => void;
  scaleToFull: () => void;
};
