import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from '~/pages/Welcome';
import Issues from '~/pages/Issues';

const Routes = createAppContainer(
  createSwitchNavigator({
    Welcome,
    Issues,
  }),
  {
    initialRouteName: 'Welcome',
  },
);

export default Routes;
