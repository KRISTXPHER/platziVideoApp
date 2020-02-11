import React, {Component} from 'react';
import {
  FlatList
} from 'react-native';
import Empty from '../components/empty';
import Separator from '../../sections/components/horizontal_separator';
import Category from '../components/category';
import CategoriesLayout from '../components/categories_list_layout';

class CategoriesList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmpty = () => <Empty text='No hay categorias'/>
  itemSeparator = () => <Separator />
  renderItem = ({item}) => {
    return (
      <Category {...item}/>
    );
  }
  render() {
    return (
      <CategoriesLayout title='Categorías'>
        <FlatList
        horizontal
        keyExtractor={this.keyExtractor}
        data={this.props.list}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={this.itemSeparator}
        renderItem={this.renderItem}
      />
      </CategoriesLayout>
    );
  }
}

export default CategoriesList;