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
    backgroundColor: 'rgba(255,255,255,.3)',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 35,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center'
  }
});

export default ControlsLayout;