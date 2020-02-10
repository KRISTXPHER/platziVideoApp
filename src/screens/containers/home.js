import React, { Component } from 'react';
import API from '../../../src/utils/api';

class Home extends Component {
  async componentDidMount() {
    const movies = API.getSuggestions(10);
    console.log(movies);
  }
  render() {
    return this.props.children
  }
}

export default Home;