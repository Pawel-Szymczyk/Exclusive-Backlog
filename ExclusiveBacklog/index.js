/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import {enGB, registerTranslation} from 'react-native-paper-dates';
// registerTranslation('en-GB', enGB);

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

AppRegistry.registerComponent(appName, () => Main);
