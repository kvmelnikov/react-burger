import {
  SET_VALUE_TO_FORM,
  FORGOT_PASS_FORM_SUBMIT,
  FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  FORGOT_PASS_FORM_SUBMIT_FAILED,
} from '../actions/form-action';

export const stateForms = {
  formForgotPassword: {
    inputs: {
      email: { value: '' },
    },
    Request: false,
    Failed: false,
  },
};

export const formReducer = (state = stateForms, action) => {
  switch (action.type) {
    case SET_VALUE_TO_FORM: {
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          inputs: {
            ...state.formForgotPassword.inputs,
            [action.field]: {
              ...state.formForgotPassword.inputs[action.field],
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

    default: {
      return state;
    }
  }
};
