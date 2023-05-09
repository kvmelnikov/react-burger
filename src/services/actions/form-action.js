export const SET_VALUE_TO_FORM = 'SET_VALUE_TO_FORM';

export const FORGOT_PASS_FORM_SUBMIT = 'FORGOT_PASS_FORM_SUBMIT';
export const FORGOT_PASS_FORM_SUBMIT_SUCCESS =
  'FORGOT_PASS_FORM_SUBMIT_SUCCESS';
export const FORGOT_PASS_FORM_SUBMIT_FAILED = 'FORGOT_PASS_FORM_SUBMIT_FAILED';
export const RESET_PASS_FORM_SUBMIT = 'RESET_PASS_FORM_SUBMIT';
export const RESET_PASS_FORM_SUBMIT_SUCCESS = 'RESET_PASS_FORM_SUBMIT_SUCCESS';
export const RESET_PASS_FORM_SUBMIT_FAILED = 'RESET_PASS_FORM_SUBMIT_FAILED';
export const setFormValue = ({ field, value, form }) => ({
  type: SET_VALUE_TO_FORM,
  field,
  value,
  form,
});

const createBodyFormRequest = (inputs) => {
  let forBody = {};
  Object.keys(inputs).forEach((key) => {
    forBody[key] = inputs[key].value;
  });
  return JSON.stringify(forBody);
};

export const forgotPassRequest = () => (dispatch, getState) => {
  dispatch({
    type: FORGOT_PASS_FORM_SUBMIT,
  });
  fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    body: createBodyFormRequest(getState().form.formForgotPassword.inputs),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.success && res.message === 'Reset email sent') {
        dispatch({
          type: FORGOT_PASS_FORM_SUBMIT_SUCCESS,
        });
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASS_FORM_SUBMIT_FAILED,
      });
    });
};

export const resetPassRequest = () => (dispatch, getState) => {
  dispatch({
    type: RESET_PASS_FORM_SUBMIT,
  });
  fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    body: createBodyFormRequest(getState().form.formResetPassword.inputs),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.success && res.message === 'Reset email sent') {
        dispatch({
          type: RESET_PASS_FORM_SUBMIT_SUCCESS,
        });
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASS_FORM_SUBMIT_FAILED,
      });
    });
};
