import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
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
    loading: false,
    error: false,
  };

  async componentDidMount() {
    await this.loadStorage();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true, loading: true });
    const { repository, repositories } = this.state;
    try {
      const { data } = await api.get(`/repos/${repository}`);
      const repo = {
        id: data.id,
        avatar_url: data.owner.avatar_url,
        name: data.name,
        company: data.full_name,
      };
      this.setState({
        repositories: [...repositories, repo],
        refreshing: false,
        loading: false,
        error: false,
        repository: '',
      });
      await this.saveStorage();
    } catch (err) {
      this.setState({ loading: false, refreshing: false, error: true });
    }
  };

  loadStorage = async () => {
    this.setState({ refreshing: true });
    const listRepositories = await AsyncStorage.getItem('@gitissues:repositories');
    console.tron.warn(listRepositories);
    if (listRepositories !== null) {
      const repo = JSON.parse(listRepositories);
      this.setState({ repositories: repo });
    }
    this.setState({ refreshing: false });
  };

  saveStorage = async () => {
    const { repositories } = this.state;
    console.tron.log(repositories);
    await AsyncStorage.setItem('@gitissues:repositories', JSON.stringify(repositories));
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

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
    const { repository, loading, error } = this.state;
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
            {loading ? (
              <ActivityIndicator size="small" style={styles.loading} />
            ) : (
              <Icon name="plus" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>Repositório não encontrado!</Text>}
        {this.renderList()}
      </View>
    );
  }
}
