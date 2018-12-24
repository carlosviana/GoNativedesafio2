import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    backgroundColor: colors.white,
    margin: 0,
  },
  headerTitle: {
    marginLeft: 300,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: metrics.baseMargin,
    backgroundColor: colors.regular,
    fontWeight: 'bold',
    borderRadius: metrics.baseRadius,
  },
});

export default styles;
