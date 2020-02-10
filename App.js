import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionsList from './src/videos/containers/suggestions_list';

const App: () => React$Node = () => {
  return (
    <Home>
      <Header />
      <Text>Buscador</Text>
      <Text>Categorias</Text>
      <SuggestionsList />
    </Home>
  );
};

export default App;
