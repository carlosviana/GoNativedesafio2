import React from 'react';
import { View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ repository }) => {
  console.tron.warn(repository);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{repository.name}</Text>
        <Text style={styles.company}>{repository.company}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="angle-right" size={12} />
      </View>
    </View>
  );
};

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default RepositoryItem;
