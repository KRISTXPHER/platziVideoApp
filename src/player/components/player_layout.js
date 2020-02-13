import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions
} from 'react-native';

class PlayerLayout extends Component {
  constructor(props) {
    super(props);

    this.timeHandler = 0;
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.timeHandler);

    this.timeHandler = 0;
  }
  state = {
    showControls: false,
    paused: false
  }
  onTapVideo = () => {
    clearTimeout(this.timeHandler);

    this.setState({
      showControls: !this.state.showControls,
    }, () => {
      if (this.state.showControls && !this.state.paused && this._isMounted)
        this.timeHandler = setTimeout(() => {
          this.setState({
            showControls: false
          })
        }, 2500);
    })
  }
  onPlayPause = (isPaused) => {
    clearTimeout(this.timeHandler);

    this.setState({
      showControls: true,
      paused: isPaused
    })

    if (!isPaused)
      this.timeHandler = setTimeout(() => {
        this.setState({
          showControls: false
        })
      }, 2500);
  }
  render() {
    return (
      <SafeAreaView
        style={this.props.isFullScreen && styles.fullscreenBackground}>
        <TouchableWithoutFeedback
          onPress={this.onTapVideo}>
          <View>
            { this.props.video }
            <View style={styles.overlay}>
              { this.props.loading && this.props.loader }
              {
                this.state.showControls &&
                <View style={this.props.isFullScreen ? styles.fullscreenControls : styles.controls}>
                  {this.props.controls}
                </View>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fullscreenBackground: {
    backgroundColor: 'black'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controls: {
    backgroundColor: 'rgba(0,0,0,.2)',
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width
  },
  fullscreenControls: {
    backgroundColor: 'rgba(0,0,0,.2)',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
  }
});

export default PlayerLayout;