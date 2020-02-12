import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

Loading = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo} />
        <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 10,
    width: 200,
    height: 80,
    resizeMode: 'contain'
  }
})

export default Loading;