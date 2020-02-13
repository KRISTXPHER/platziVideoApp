import React, { Component, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { Icon } from 'react-native-elements';

import PlayerLayout from '../components/player_layout';
import ControlsLayout from '../components/control_layout';
import PlayPause from '../components/play_pause';
import FullScreenButton from '../components/full_screen_button';

class Player extends Component {
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
    
    if (this.timeHandler) {
      clearTimeout(this.timeHandler);
      this.timeHandler = 0;
    }
  }
  videoPlayer = React.createRef();
  state = {
    loading: true,
    paused: false,
    fullScreen: false,
    currentTime: 0,
    currentTimeStr: '00:00:00',
    duration: 0,
    showControls: false
  }
  onTapVideo = () => {
    if (this._isMounted)
      this.setState({
        showControls: !this.state.showControls
      })
    
    if (!this.state.showControls)
      this.timeHandler = setTimeout(() => {
        this.setState({
          showControls: false
        })
      }, 2500);
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
        loading={this.state.loading}
        back={
          <TouchableOpacity
            style={styles.exitVideo}
            onPress={this.props.onExit}
            hitSlop={{
              left: 5,
              top: 5,
              bottom: 5,
              right: 5
            }} >
            <Icon
              name='close'
              size={40} />
          </TouchableOpacity>
        }
        video={
          <TouchableWithoutFeedback
            onPress={this.onTapVideo}>
            <Video
              source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
              ref = {this.videoPlayer}
              style={this.state.fullScreen ? styles.fullscreenVideo : styles.video}
              resizeMode='contain'
              onBuffer={this.onBuffer}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              paused={this.state.paused}
            />
          </TouchableWithoutFeedback>
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
            <Slider style={{ flex: 1 }}
              value={this.state.currentTime}
              minimumValue={0}
              maximumValue={this.state.duration}
              step={1}
              onValueChange={this.handleOnSlide}
              minimumTrackTintColor={'#F44336'}
              maximumTrackTintColor={'#FFFFFF'}
              thumbTintColor={'#F44336'}
            />
            <Text style={{width: 80, textAlign: 'center', fontFamily: 'Helvetica Neue'}}>{this.state.currentTimeStr}</Text>
            <FullScreenButton
              onPress={this.onFullScreen}
              fullScreen={this.state.fullScreen}
            />
          </ControlsLayout>
        }
        showControls={this.state.showControls}
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
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  exitVideo: {
    backgroundColor: 'rgba(255,255,255,.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10
  }
});

export default Player;