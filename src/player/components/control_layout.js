import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

function ControlsLayout(props) {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0
  }
});

export default ControlsLayout;