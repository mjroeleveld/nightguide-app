import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import S from '../../config/styles';
import SearchBar from '../../components/SearchBar';

class ExploreScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Image source={require('../../img/tabbar/explore.png')} />,
  };

  static TAGS = [];

  state = { searchIsFocused: false };

  focusSearch = () =>
    this.setState({
      searchIsFocused: true,
    });

  blurSearch = () =>
    this.setState({
      searchIsFocused: false,
    });

  onSubmit = query => {
    this.blurSearch();
    this.props.navigation.navigate('List', { query });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          query={this.props.query}
          focused={this.state.searchIsFocused}
          onFocus={this.focusSearch}
          onCancelPress={this.blurSearch}
          onSubmit={this.onSubmit}
          style={styles.searchBar}
          city={this.props.city}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  city: state.venues.city,
  query: state.venues.list.query,
});

export default connect(mapStateToProps)(ExploreScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: S.dimensions.screenOffset,
  },
  searchBar: {
    marginHorizontal: S.dimensions.screenOffset,
  },
});
