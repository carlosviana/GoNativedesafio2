import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class RepositoryItem extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  erroEsLint = () => {};

  render() {
    const { repository } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{repository.name}</Text>
          <Text style={styles.company}>{repository.company}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            data={repository}
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate('Issues', { repository });
            }}
          >
            <Icon name="angle-right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(RepositoryItem);
