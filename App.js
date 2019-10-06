import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

// Utilizado para desabilitar os warnings que exibem no app.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes />
}
