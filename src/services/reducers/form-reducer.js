import {
  SET_VALUE_TO_FORM,
  FORGOT_PASS_FORM_SUBMIT,
  FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  FORGOT_PASS_FORM_SUBMIT_FAILED,
  RESET_PASS_FORM_SUBMIT,
  RESET_PASS_FORM_SUBMIT_SUCCESS,
  RESET_PASS_FORM_SUBMIT_FAILED,
} from '../actions/form-action';

export const stateForms = {
  formForgotPassword: {
    inputs: {
      email: { value: '' },
    },
    Request: false,
    Failed: false,
  },
  formResetPassword: {
    inputs: {
      password: { value: 'new pass' },
      token: { value: 'token' },
    },
    Request: false,
    Failed: false,
  },
};

export const formReducer = (state = stateForms, action) => {
  switch (action.type) {
    case SET_VALUE_TO_FORM: {
      console.log(action);
      console.log(state);
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          inputs: {
            ...state[action.form].inputs,
            [action.field]: {
              value: action.value,
            },
          },
        },
      };
    }
    case FORGOT_PASS_FORM_SUBMIT: {
      return {
        ...state,
        formForgotPassword: {
          ...state.formForgotPassword,
          Request: true,
          Failed: false,
        },
      };
    }
    case FORGOT_PASS_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formForgotPassword: {
          ...stateForms.formForgotPassword,
        },
      };
    }
    case FORGOT_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formForgotPassword: {
          ...state.formForgotPassword,
          Request: false,
          Failed: true,
        },
      };
    }

    case RESET_PASS_FORM_SUBMIT: {
      return {
        ...state,
        formResetPassword: {
          ...state.formResetPassword,
          Request: true,
          Failed: false,
        },
      };
    }
    case RESET_PASS_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formResetPassword: {
          ...stateForms.formResetPassword,
        },
      };
    }
    case RESET_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formResetPassword: {
          ...state.formResetPassword,
          Request: false,
          Failed: true,
        },
      };
    }

    default: {
      return state;
    }
  }
};
