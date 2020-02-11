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
    paddingHorizontal: 10,
    height: 25,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'gray',
  },
  button: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default PlayPause;