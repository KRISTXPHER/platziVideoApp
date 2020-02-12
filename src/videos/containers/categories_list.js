import React, {Component} from 'react';
import {
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import Empty from '../components/empty';
import Separator from '../../sections/components/horizontal_separator';
import Category from '../components/category';
import CategoriesLayout from '../components/categories_list_layout';

function mapStateToProps(state) {
  return {
    list: state.categoriesList
  }
}

class CategoriesList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmpty = () => <Empty text='There are no categories'/>
  itemSeparator = () => <Separator />
  renderItem = ({item}) => {
    return (
      <Category {...item}/>
    );
  }
  render() {
    return (
      <CategoriesLayout title='Categories'>
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

export default connect(mapStateToProps)(CategoriesList);