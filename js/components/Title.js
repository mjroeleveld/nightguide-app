import React from 'react';
import { StyleSheet } from 'react-native';

import Text from './Text';

const Title = props => (
  <Text style={[styles.text, props.style]}>{props.children}</Text>
);

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 26,
    letterSpacing: -0.5,
  },
});
