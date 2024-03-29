import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../config/styles/colors';

class BigButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    darkTitle: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.any,
  };

  static defaultProps = {
    loading: false,
  };

  state = {
    loadingOpacity: new Animated.Value(this.props.loading ? 1 : 0),
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loading !== this.props.loading) {
      Animated.timing(this.state.loadingOpacity, {
        toValue: this.props.loading ? 1 : 0,
      }).start();
    }
  }

  onPress = () => {
    if (!this.props.disabled && !this.props.loading) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.onPress}
        style={[
          styles.button,
          this.props.disabled && styles.disabled,
          this.props.style,
        ]}
      >
        {!this.props.loading && (
          <React.Fragment>
            <Image style={styles.icon} source={this.props.icon} />
            <Animated.Text
              style={[
                styles.title,
                this.props.darkTitle && styles.titleDark,
                {
                  opacity: this.state.loadingOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            >
              {this.props.title}
            </Animated.Text>
          </React.Fragment>
        )}
        {this.props.loading && (
          <Animated.View style={{ opacity: this.state.loadingOpacity }}>
            <ActivityIndicator
              color={
                this.props.darkTitle ? colors.textDark : colors.textDefault
              }
              size={'small'}
            />
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  }
}

export default BigButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.textDefault,
    fontSize: 15,
    textAlign: 'center',
    minHeight: 20,
  },
  titleDark: {
    color: colors.textDark,
  },
  disabled: {
    opacity: 0.8,
  },
  icon: {
    marginRight: 10,
  },
});
