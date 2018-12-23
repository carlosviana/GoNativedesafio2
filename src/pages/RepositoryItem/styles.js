import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    margin: metrics.baseMargin,
    padding: metrics.basePadding,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: metrics.baseMargin,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 12,
    color: colors.regular,
  },
  iconContainet: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default styles;
