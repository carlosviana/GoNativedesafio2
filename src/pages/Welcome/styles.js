import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  header: {
    height: 50,
    backgroundColor: colors.white,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: colors.lighter,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.basePadding,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 34,
    width: 300,
  },
  button: {
    margin: metrics.baseMargin,
  },
  loading: {
    color: colors.regular,
  },
  error: {
    color: colors.danger,
  },
});

export default styles;
