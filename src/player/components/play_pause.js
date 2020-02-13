import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon } from 'react-native-elements';
import { createPropertySignature } from 'typescript';

function PlayPause(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      hitSlop={{
        left: 5,
        top: 5,
        bottom: 5,
        right: 5
      }}
    >
    <Icon
      color={props.color}
      name={
        props.paused ? 'play-arrow' : 'pause'
      }
      size={50} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -25,
    marginTop: -25,
    justifyContent: 'center'
  }
});

export default PlayPause;