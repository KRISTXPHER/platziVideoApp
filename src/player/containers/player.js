import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Slider
} from 'react-native';
import Video from 'react-native-video';

import PlayerLayout from '../components/player_layout';
import ControlsLayout from '../components/control_layout';
import PlayPause from '../components/play_pause';
import FullScreenButton from '../components/full_screen_button';

class Player extends Component {
  state = {
    loading: true,
    paused: false,
    fullScreen: false,
    currentTime: '00:00:00',
    duration: 0
  }
  onLoad = (data: onLoadData) => {
    this.setState({
      loading: false,
      duration: data.duration,
      currentTime: data.currentTime
    })

  }
  onProgress = ({ currentTime }) => {
    this.setState({
      currentTime: currentTime
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
  onSlideCapture = (data: onSeekData) => {
    this.setState({
      currentTime: data.seekTime
    });
  }
  handleOnSlide = ({ time }) => {
    onSlideCapture({seekTime: time})
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
    elapsedTime = new Date(null);
    elapsedTime.setSeconds(seconds);
    return elapsedTime.toISOString().substr(11, 8);
  }
  getMinutesFromSeconds(time: number) {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
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
            <Text>{this.getTimeElapsed(Math.floor(this.state.currentTime))} | </Text>
            <Slider
              value={this.state.currentTime}
              minimumValue={0}
              maximumValue={this.state.duration}
              step={1}
              onValueChange={this.handleOnSlide}
              onSlidingStart={this.onSlideStart}
              onSlidingComplete={this.onSlideComplete}
              minimumTrackTintColor={'#F44336'}
              maximumTrackTintColor={'#FFFFFF'}
              thumbTintColor={'#F44336'}
            />
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