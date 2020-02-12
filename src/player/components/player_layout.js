import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

function PlayerLayout(props) {
  return (
    <View style={props.isFullScreen && styles.fullScreen}>
      {props.video}
      <View style={styles.overlay}>
        {
          props.loading && props.loader
        }
      </View>
      {props.controls}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    transform: [
      {translateY: -46}
    ]
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PlayerLayout;