import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import __ from '../../services/i18n';
import { login } from '../../state/account/actions';
import { showWarnMessage } from '../../state/messages';
import S from '../../config/styles';
import Header from '../../components/header/Header';
import FormItem from '../../components/forms/FormItem';
import Form from '../../components/forms/Form';
import HeaderBackButton from '../../components/header/HeaderBackButton';
import BigButton from '../../components/buttons/BigButton';
import TextInput from '../../components/forms/TextInput';
import HeaderRightButton from '../../components/header/HeaderRightButton';

class LoginScreen extends React.Component {
  static screenOptions = {
    errorMessages: {
      'account.login.error': {
        user_not_found: __('loginScreen.userNotFound'),
        user_not_verified: __('loginScreen.userNotVerified'),
        incorrect_credentials: __('loginScreen.incorrectCredentials'),
        validation_error: __('loginScreen.invalidEmail'),
        invalid_auth_type: __('loginScreen.invalidAuthType'),
      },
    },
    backgroundImage: require('../../img/login-bg.jpg'),
  };

  state = {
    formValid: false,
    form: {
      email: null,
      password: false,
    },
  };

  onSubmit = () => {
    this.form.commit();
    if (!this.state.formValid) {
      return this.props.showWarnMessage(__('fixFormErrors'));
    }
    this.props.login(_.trim(this.state.form.email), this.state.form.password);
  };

  showResetPassword = () => {
    this.props.navigation.navigate('ResetPassword');
  };

  handleOnChange = _.memoize(key => val => {
    this.setState({ form: { ...this.state.form, [key]: val } });
  });

  handleCommitValue = _.memoize(key => () => this.form.commitValue(key));

  onFormValidChange = formValid => this.setState({ formValid });

  setFormRef = ref => (this.form = ref);

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header style={styles.header}>
            <HeaderBackButton />
            <HeaderRightButton
              onPress={this.showResetPassword}
              title={__('loginScreen.forgotPassword')}
            />
          </Header>
          <Form
            ref={this.setFormRef}
            onValidChange={this.onFormValidChange}
            values={this.state.form}
          >
            <FormItem
              required={true}
              validator={FormItem.validators.email}
              value={'email'}
              label={__('loginScreen.email')}
            >
              <TextInput
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={this.handleOnChange('email')}
                onBlur={this.handleCommitValue('email')}
                val={this.state.form.email}
              />
            </FormItem>
            <FormItem
              required={true}
              value={'password'}
              label={__('loginScreen.password')}
            >
              <TextInput
                textContentType={'password'}
                secureTextEntry={true}
                onChangeText={this.handleOnChange('password')}
                onBlur={this.handleCommitValue('password')}
                val={this.state.form.password}
              />
            </FormItem>
            <BigButton
              style={[S.buttons.submitButton, S.buttons.whiteButton]}
              title={__('loginScreen.login')}
              darkTitle={true}
              onPress={this.onSubmit}
              loading={this.props.isFetching}
            />
          </Form>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.account.login.isFetching,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login({ email, password })),
  showWarnMessage: message => dispatch(showWarnMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: S.dimensions.screenOffset,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});
