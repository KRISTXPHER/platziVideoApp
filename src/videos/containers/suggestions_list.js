import React, { Component } from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import SuggestionsLayout from '../components/suggestions_list_layout';
import Empty from '../components/empty';
import Separator from '../components/vertical_separator';
import Suggestion from '../components/suggestion';

class SuggestionsList extends Component {
  renderEmpty = () => <Empty text='No hay sugerencias' />;
  itemSeparator = () => <Separator />
  renderItem = ({ item }) => {
    return (
      <Suggestion {...item} />
    )
  }
  render() {
    const list = [
      {
        title: 'Texto 1',
        key: '1'
      },
      {
        title: 'Texto 2',
        key: '2'
      }
    ];
    return (
      <SuggestionsLayout title='Recomendado para ti'>
        <FlatList
          data={list}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
      </SuggestionsLayout>
    );
  }
}

export default SuggestionsList;