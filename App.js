import React, { Component } from 'react';
import {
  Text, View, StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionsList from './src/videos/containers/suggestions_list';
import CategoriesList from './src/videos/containers/categories_list';
import Player from './src/player/containers/player';
import Loading from './src/sections/components/loading'
import { store, persistor } from './store';
import API from './src/utils/api';

type Props = {};
export default class App extends Component<Props> {
  state = {
  }
  handleOrientation = (orientation) => {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? StatusBar.setHidden(true)
      : StatusBar.setHidden(false)
  }
  async componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientation);
    const categoriesList = await API.getMovies();
    store.dispatch({
      type: 'SET_CATEGORIES_LIST',
      payload: {
        categoriesList
      }
    })
    
    const suggestionsList = await API.getSuggestions(10);
    store.dispatch({
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
    return (
      <Provider
        store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={ persistor } >
          <Home>
            <Header />
            <Player />
            <Text>Buscador</Text>
            <CategoriesList />
            <SuggestionsList />
          </Home>
        </PersistGate>
      </Provider>
    );
  }
};
