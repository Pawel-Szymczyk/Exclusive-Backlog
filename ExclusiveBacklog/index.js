/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import HelloWorldApp from './src/components/hello-world';
import App from './src/components/App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => HelloWorldApp);
AppRegistry.registerComponent(appName, () => App);
