import React, { Component } from 'react';
import {
  View, Text, FlatList, StatusBar, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '~/services/api';

import IssuesItem from './IssuesItem';
import styles from './styles';

class Issues extends Component {
  static propTypes = PropTypes.shape({
    navigation: PropTypes.string,
  }).isRequired;

  state = {
    issues: [],
    refreshing: false,
    active: 'all',
    error: false,
  };

  async componentDidMount() {
    await this.loadIssues('all');
  }

  loadIssues = async (type) => {
    this.setState({ refreshing: true, error: false });
    const { navigation } = this.props;
    const repo = navigation.getParam('repository');
    try {
      const { data } = await api.get(`/repositories/${repo.id}/issues?state=${type}`);
      this.setState({ issues: data, refreshing: false, active: type });
    } catch (err) {
      this.setState({ refreshing: false, error: true });
    }
  };

  renderListItem = ({ item }) => <IssuesItem issues={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;
    return (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const { active, error } = this.state;
    const data = navigation.getParam('repository');
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Welcome');
            }}
          >
            <Icon name="angle-left" size={32} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{data.name}</Text>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => this.loadIssues('all')}>
            <Text style={active === 'all' ? styles.tabsactiveyes : styles.tabactiveno}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => this.loadIssues('open')}>
            <Text style={active === 'open' ? styles.tabsactiveyes : styles.tabactiveno}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => this.loadIssues('closed')}>
            <Text style={active === 'closed' ? styles.tabsactiveyes : styles.tabactiveno}>
              Fechadas
            </Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>Erro ao buscar as issues!</Text>}
        <View style={styles.lista}>{this.renderList()}</View>
      </View>
    );
  }
}

export default withNavigation(Issues);
