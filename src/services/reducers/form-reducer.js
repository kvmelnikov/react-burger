import {
  SET_VALUE_TO_FORM,
  FORGOT_PASS_FORM_SUBMIT,
  FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  FORGOT_PASS_FORM_SUBMIT_FAILED,
  RESET_PASS_FORM_SUBMIT,
  RESET_PASS_FORM_SUBMIT_SUCCESS,
  RESET_PASS_FORM_SUBMIT_FAILED,
  REGISTRATION_FORM_SUBMIT,
  REGISTRATION_FORM_SUBMIT_SUCCESS,
  REGISTRATION_FORM_SUBMIT_FAILED,
  LOGIN_FORM_SUBMIT,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  LOGOUT_FORM_SUBMIT,
  LOGOUT_FORM_SUBMIT_SUCCESS,
  LOGOUT_FORM_SUBMIT_FAILED,
  GET_USER_FORM_SUBMIT,
  GET_USER_FORM_SUBMIT_SUCCESS,
  GET_USER_FORM_SUBMIT_FAILED,
  RESET_USER_FORM,
} from "../actions/form-action";

export const stateForms = {
  formProfile: {
    inputs: {
      email: { value: null },
      name: { value: null },
      pass: { value: null },
    },
    request: false,
    failed: false,
  },
  formForgotPassword: {
    inputs: {
      email: { value: "" },
    },
    request: false,
    failed: false,
    redirect: false,
  },
  formResetPassword: {
    inputs: {
      password: { value: "" },
      token: { value: "" },
    },
    Request: false,
    Failed: false,
  },
  formRegister: {
    inputs: {
      email: { value: "" },
      password: { value: "" },
      name: { value: "" },
    },
    Request: false,
    Failed: false,
  },
  formLogin: {
    inputs: {
      email: { value: "" },
      password: { value: "" },
    },
    request: false,
    failed: false,
  },
  Logout: {
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
          request: true,
          failed: false,
        },
      };
    }
    case FORGOT_PASS_FORM_SUBMIT_SUCCESS: {
      console.log("");
      return {
        ...state,
        formForgotPassword: {
          ...stateForms.formForgotPassword,
          request: false,
          failed: false,
          redirect: true,
        },
      };
    }
    case FORGOT_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formForgotPassword: {
          ...state.formForgotPassword,
          request: false,
          failed: true,
        },
      };
    }

    case REGISTRATION_FORM_SUBMIT: {
      return {
        ...state,
        formRegister: {
          ...state.formRegister,
          Request: true,
          Failed: false,
        },
      };
    }
    case REGISTRATION_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formRegister: {
          ...stateForms.formRegister,
        },
      };
    }
    case REGISTRATION_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formRegister: {
          ...state.formRegister,
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
          Request: false,
          Failed: false,
        },
      };
    }
    case RESET_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formResetPassword: {
          ...state.formResetPassword,
          request: false,
          failed: true,
        },
      };
    }

    case LOGIN_FORM_SUBMIT: {
      return {
        ...state,
        formLogin: {
          ...state.formLogin,
          request: true,
          failed: false,
        },
      };
    }

    case LOGIN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formLogin: {
          ...stateForms.formLogin,
          request: false,
          failed: false,
        },
      };
    }
    case LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formLogin: {
          ...state.formLogin,
          Request: false,
          Failed: true,
        },
      };
    }

    case LOGOUT_FORM_SUBMIT: {
      return {
        ...state,
        formLogout: {
          ...state.formLogout,
          Request: true,
          Failed: false,
        },
      };
    }
    case LOGOUT_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formLogout: {
          ...stateForms.formLogout,
        },
      };
    }
    case LOGOUT_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formLogout: {
          ...state.formLogout,
          Request: false,
          Failed: true,
        },
      };
    }

    case GET_USER_FORM_SUBMIT: {
      return {
        ...state,
        formProfile: {
          ...state.formProfile,
          request: true,
          failed: false,
        },
      };
    }
    case GET_USER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        formProfile: {
          inputs: {
            email: { value: action.value.email },
            name: { value: action.value.name },
            pass: { value: "" },
          },
          request: false,
          failed: false,
        },
      };
    }
    case GET_USER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formProfile: {
          ...state.formProfile,
          request: false,
          failed: true,
        },
      };
    }
    case RESET_USER_FORM: {
      return {
        ...state,
        formProfile: {
          inputs: {
            email: { value: null },
            name: { value: null },
          },
          request: false,
          failed: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};
