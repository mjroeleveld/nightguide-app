import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  login,
  loginError,
  loginFbDialog,
  loginFbError,
  resetPassword,
  resetPasswordError,
  resetPasswordSuccess,
  setAccount,
  signup,
  signupError,
  signupSuccess,
  sendFeedback,
  sendFeedbackError,
  sendFeedbackSuccess,
} from './actions';

export default handleActions(
  {
    [signup]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: true },
          error: { $set: null },
          success: { $set: false },
        },
      }),
    [signupSuccess]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: false },
          success: { $set: true },
        },
      }),
    [signupError]: (state, action) =>
      update(state, {
        signup: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [login]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: true },
          error: { $set: null },
        },
      }),
    [loginError]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [loginFbDialog]: (state, action) =>
      update(state, {
        fbLogin: {
          error: { $set: null },
        },
      }),
    [loginFbError]: (state, action) =>
      update(state, {
        fbLogin: {
          error: { $set: action.payload },
        },
      }),
    [resetPassword]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: true },
          error: { $set: null },
          success: { $set: false },
        },
      }),
    [resetPasswordSuccess]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: false },
          success: { $set: true },
        },
      }),
    [resetPasswordError]: (state, action) =>
      update(state, {
        resetPassword: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [sendFeedback]: (state, action) =>
      update(state, {
        sendFeedback: {
          isFetching: { $set: true },
          error: { $set: null },
          success: { $set: false },
        },
      }),
    [sendFeedbackSuccess]: (state, action) =>
      update(state, {
        sendFeedback: {
          isFetching: { $set: false },
          success: { $set: true },
        },
      }),
    [sendFeedbackError]: (state, action) =>
      update(state, {
        sendFeedback: {
          isFetching: { $set: false },
          error: { $set: action.payload },
        },
      }),
    [setAccount]: (state, action) =>
      update(state, {
        login: {
          isFetching: { $set: false },
          error: { $set: null },
        },
        fbLogin: {
          error: { $set: null },
        },
        token: { $set: action.payload.token },
        user: { $set: action.payload.user },
      }),
  },
  {
    signup: {
      isFetching: false,
      success: false,
      error: null,
    },
    login: {
      isFetching: false,
      error: null,
    },
    fbLogin: {
      error: null,
    },
    resetPassword: {
      isFetching: false,
      success: false,
      error: null,
    },
    sendFeedback: {
      isFetching: false,
      success: false,
      error: null,
    },
    user: {},
    token: null,
  }
);
