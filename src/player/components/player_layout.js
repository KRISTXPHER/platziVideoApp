import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

function PlayerLayout(props) {
  return (
    <View>
      { props.video }
      { props.showControls && props.back }
      <View style={styles.overlay}>
        { props.loading && props.loader }
      </View>
      { props.showControls && props.controls }
    </View>
  );
}

const styles = StyleSheet.create({
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