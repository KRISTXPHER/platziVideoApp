import React, { Component } from 'react';

import {
  Text, View,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionsList from './src/videos/containers/suggestions_list';
import CategoriesList from './src/videos/containers/categories_list';
import Player from './src/player/containers/player';
import API from './src/utils/api';

type Props = {};
export default class App extends Component<Props> {
  state = {
    suggestionsList: [],
    categoriesList: []
  }
  async componentDidMount() {
    const movies = await API.getSuggestions(10);
    const categories = await API.getMovies();
    console.log(movies);
    console.log(categories);
    this.setState({
      suggestionsList: movies,
      categoriesList: categories
    })
  }
  render() {
    return (
      <Home>
        <Header />
        <Player />
        <Text>Buscador</Text>
        <CategoriesList
          list={this.state.categoriesList}
        />
        <SuggestionsList
          list={this.state.suggestionsList}
        />
      </Home>
    );
  }
};
