import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

function exitButton(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      hitSlop={{
        left: 5,
        top: 5,
        bottom: 5,
        right: 5
      }} >
      <Icon
        color={props.color}
        name='close'
        size={40} />
    </TouchableOpacity>
  )
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10
  }
}

export default exitButton;