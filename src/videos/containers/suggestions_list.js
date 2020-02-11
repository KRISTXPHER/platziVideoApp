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
  keyExtractor = (item) => item.id.toString();
  renderEmpty = () => <Empty text='No hay sugerencias' />;
  itemSeparator = () => <Separator />
  renderItem = ({ item }) => {
    return (
      <Suggestion {...item} />
    )
  }
  render() {
    return (
      <SuggestionsLayout title='Recomendado para ti'>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
      </SuggestionsLayout>
    );
  }
}

export default SuggestionsList;