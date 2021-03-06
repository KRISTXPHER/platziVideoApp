import React, { Component } from 'react';
import {
  Text,
  StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { connect } from 'react-redux';

import API from './utils/api';
import Home from './screens/containers/home';
import Header from './sections/components/header';
import SuggestionsList from './videos/containers/suggestions_list';
import CategoriesList from './videos/containers/categories_list';
import Movie from './screens/containers/movie';

class AppLayout extends Component {
  handleOrientation = (orientation) => {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? StatusBar.setHidden(true)
      : StatusBar.setHidden(false)
  }
  async componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientation);
    const categoriesList = await API.getMovies();
    this.props.dispatch({
      type: 'SET_CATEGORIES_LIST',
      payload: {
        categoriesList
      }
    })
    
    const suggestionsList = await API.getSuggestions(10);
    this.props.dispatch({
      type: 'SET_SUGGESTIONS_LIST',
      payload: {
        suggestionsList
      }
    })
  }
  componentWillUnmount() {
    Orientation.removeOrientationListener(this.handleOrientation);
  }
  render() {
    if (this.props.selectedMovie) {
      return <Movie />
    }
    return (
      <Home>
        <Header />
        <Text>Buscador</Text>
        <CategoriesList />
        <SuggestionsList />
      </Home>
    )
  }
}

mapStateToProps = (state) => {
  return {
    selectedMovie: state.selectedMovie
  }
}

export default connect(mapStateToProps)(AppLayout);