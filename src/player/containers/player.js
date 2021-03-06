import React, { Component, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { Icon } from 'react-native-elements';

import PlayerLayout from '../components/player_layout';
import ControlsLayout from '../components/control_layout';
import PlayPause from '../components/play_pause';
import FullScreenButton from '../components/full_screen_button';
import ExitButton from '../components/exit_button';

class Player extends Component {
  constructor(props) {
    super(props);

    this.videoPlayer = React.createRef();
    this.playerLayout = React.createRef();
  }
  
  state = {
    loading: true,
    paused: false,
    fullScreen: false,
    currentTime: 0,
    currentTimeStr: '00:00:00',
    duration: 0
  }
  onLoad = (data: onLoadData) => {
    this.setState({
      loading: false,
      duration: data.duration,
      currentTime: data.currentTime,
      currentTimeStr: this.getTimeElapsed(data.currentTime)
    })
  }
  onProgress = ({ currentTime }) => {
    this.setState({
      currentTime: currentTime,
      currentTimeStr: this.getTimeElapsed(currentTime)
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
    }, () => {
      this.playerLayout.current.onPlayPause(this.state.paused);
    })
  }
  handleOnSlide = (seekTime) => {
    this.videoPlayer.current.seek(seekTime);
    this.setState({
      currentTime: seekTime,
      currentTimeStr: this.getTimeElapsed(seekTime)
    });
  }
  onFullScreen = () => {
    this.state.fullScreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
    this.setState({
      fullScreen: !this.state.fullScreen
    })
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
        ref = {this.playerLayout}
        loading={this.state.loading}
        video={
          <Video
            source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
            ref = {this.videoPlayer}
            style={this.state.fullScreen ? styles.fullscreenVideo : styles.video}
            resizeMode='contain'
            onBuffer={this.onBuffer}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            paused={this.state.paused} />
        }
        loader={
          <ActivityIndicator color='red' size={50}/>
        }
        controls={
          <ControlsLayout>
            <ExitButton
              color='white'
              onPress={this.props.onExit} />
            <PlayPause
                color='white'
                onPress={this.onPlayPause}
                paused={this.state.paused} />
            <View style={styles.bottomControls}>
              <Slider style={styles.slider}
                value={this.state.currentTime}
                minimumValue={0}
                maximumValue={this.state.duration}
                step={1}
                onValueChange={this.handleOnSlide}
                minimumTrackTintColor={'#F44336'}
                maximumTrackTintColor={'#FFFFFF'}
                thumbTintColor={'#F44336'} />
              <Text style={styles.timeElapsed}>{this.state.currentTimeStr}</Text>
              <FullScreenButton
                color='white'
                onPress={this.onFullScreen}
                fullScreen={this.state.fullScreen}
              />
            </View>
          </ControlsLayout>
        }
        isFullScreen={this.state.fullScreen} />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    backgroundColor: 'black',
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
  },
  slider: {
    flex: 1
  },
  fullscreenVideo: {
    transform: [
      {translateX: -44}
    ],
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  timeElapsed: {
    color: 'white',
    width: 80,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue'
  }
});

export default Player;