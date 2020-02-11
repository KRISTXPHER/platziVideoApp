import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

import PlayerLayout from '../components/player_layout';
import ControlsLayout from '../components/control_layout';
import PlayPause from '../components/play_pause';
import FullScreenButton from '../components/full_screen_button';

class Player extends Component {
  state = {
    loading: true,
    paused: false,
    fullScreen: false,
    currentTime: '00:00:00'
  }
  onLoad = () => {
    this.setState({
      loading: false,
    })

  }
  onProgress = ({ currentTime }) => {
    console.log(Math.floor(currentTime))
    this.setState({
      currentTime: this.getTimeElapsed(Math.floor(currentTime))
    })
  }
  onBuffer = ({ isBuffering }) => {
    this.setState({
      loading: isBuffering
    })
  }
  onPlayPause = () => {
    this.setState({
      paused: !this.state.paused
    })
  }
  onFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    })
    this.state.fullScreen
      ? this.player.presentFullscreenPlayer()
      : this.player.dismissFullscreenPlayer()
  }
  getTimeElapsed = (seconds) => {
    elapsedTime = new Date();
    elapsedTime.setSeconds(seconds);
    return elapsedTime.toISOString().substr(11, 8);
  }
  render() {
    return (
      <PlayerLayout
        loading={this.state.loading}
        video={
          <Video
            source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
            ref = {(ref) => {
              this.player = ref
            }}
            style={styles.video}
            resizeMode='contain'
            onBuffer={this.onBuffer}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            paused={this.state.paused}
            fullscreen={this.state.fullScreen}
            fullscreenAutorotate={false}
            fullscreenOrientation='landscape'
          />
        }
        loader={
          <ActivityIndicator color='red'/>
        }
        controls={
          <ControlsLayout>
            <PlayPause
              onPress={this.onPlayPause}
              paused={this.state.paused}
            />
            <Text>progress bar | </Text>
            <Text>{this.state.currentTime} | </Text>
            <FullScreenButton
              onPress={this.onFullScreen}
              fullScreen={this.state.fullScreen}
            />
          </ControlsLayout>
        }
      >
      </PlayerLayout>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

export default Player;