/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import App from './App';
// import HelloWorldApp from './src/components/hello-world';
import App from './src/containers/App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <PaperProvider
      settings={{
        icon: props => <Icon {...props} />,
      }}>
      <App />
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => HelloWorldApp);
AppRegistry.registerComponent(appName, () => Main);
