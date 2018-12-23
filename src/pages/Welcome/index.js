import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';

import RepositoryItem from '../RepositoryItem';

import styles from './styles';

export default class Welcome extends Component {
  state = {
    repository: '',
    repositories: [],
    refreshing: false,
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const { repository } = this.state;
    const { data } = await api.get(`/repos/${repository}`);
    const repo = {
      id: data.id,
      avatar_url: data.owner.avatar_url,
      name: data.name,
      company: data.full_name,
    };
    this.setState({ repositories: [...this.state.repositories, repo], refreshing: false });
  };

  renderListItem = ({ item }) => {
    console.tron.log(item);
    return <RepositoryItem repository={item} />;
  };

  renderList = () => {
    const { repositories, refreshing } = this.state;

    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { repository } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GitIssues</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar novo repositório"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={repository}
            onChangeText={text => this.setState({ repository: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.loadRepositories}>
            <Icon name="plus" size={20} />
          </TouchableOpacity>
        </View>
        {this.renderList()}
      </View>
    );
  }
}
