import React from 'react';

import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Icon } from 'react-native-elements'

function FullScreenButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      hitSlop={{
        left: 5,
        top: 5,
        bottom: 5,
        right: 5
      }} >
      <Icon
      name = { props.fullScreen ? 'fullscreen-exit' : 'fullscreen'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

})

export default FullScreenButton;