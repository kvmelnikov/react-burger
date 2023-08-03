import { combineReducers } from 'redux';
import { burgerReducer } from './burger-reducer';
import { ingredientsReducer } from './ingredients-reducer';
import { modalReducer } from './modal-reducer';
import { apiReducer } from './api-reducer';
import { formReducer } from './form-reducer';

export const reducer = {
  burger: burgerReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  api: apiReducer,
  form: formReducer,
};
