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
        name={
          props.paused ? 'play-arrow' : 'pause'
        } />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginRight: 5,
    marginVertical: 5
  }
});

export default PlayPause;