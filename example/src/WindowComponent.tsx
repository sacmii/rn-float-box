import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type TProps = {
  onToggleFullScreen: () => void;
  onToggleClose: () => void;
};

const IconItem: React.FC<{
  children?: React.ReactNode;
  onPress?: () => void;
}> = ({ children = null, onPress = () => {} }) => (
  <View style={styles.iconRoot}>
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  </View>
);

const WindowComponent: React.FC<TProps> = ({
  onToggleClose = () => {},
  onToggleFullScreen = () => {},
}) => {
  return (
    <SafeAreaView style={[styles.flex1, styles.border]}>
      {/* Head component */}
      <View style={styles.headRoot}>
        <View style={styles.flex1} />
        <View style={styles.iconRow}>
          <IconItem onPress={onToggleFullScreen}>
            <MaterialIcons name="fullscreen" size={24} color="#898988" />
          </IconItem>
          <View style={styles.gapIcon} />
          <IconItem onPress={onToggleClose}>
            <MaterialIcons name="close" size={24} color="#e5e4e7" />
          </IconItem>
        </View>
      </View>
      {/* EO: Head component */}
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images5.alphacoders.com/423/423148.jpg',
          }}
          resizeMode="contain"
          style={styles.imageItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default WindowComponent;

const styles = StyleSheet.create({
  imageItem: {
    flex: 1,
  },
  border: {
    borderRadius: 10,
  },
  flex1: {
    flex: 1,
  },
  flex: {
    display: 'flex',
  },
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  iconRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headRoot: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 3,
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  gapIcon: {
    marginLeft: 5,
  },
});
