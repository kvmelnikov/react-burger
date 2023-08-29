export interface IInputsFormForgotPassword {
  email: { value: string }
}

export interface IInputsFormLogin extends IInputsFormForgotPassword {
  password: { value: string }
}

export interface IInputsResetPassword {
  password: { value: string }
  token: { value: string }
}

export interface IInputsFormProfile extends IInputsFormLogin {
  name: { value: string }
}

// export interface IInputsKeyAccess extends IInputsFormLogin {
//   [name: string]: { value: string }
// }

interface Ilogout {
  request: boolean
  failed: boolean
}

interface IFormProfile extends Ilogout {
  inputs: IInputsFormProfile
  success: boolean
}

interface IformForgotPassword extends Ilogout {
  inputs: IInputsFormForgotPassword
  redirect: boolean
}

interface IformResetPassword extends Ilogout {
  inputs: IInputsResetPassword
}

interface IformRegister extends Ilogout {
  inputs: IInputsFormProfile
}

interface IformLogin extends Ilogout {
  inputs: IInputsFormLogin
}
interface IlogoutUser {
  request: boolean
  failed: boolean
  success: boolean
}

export interface IFormsState {
  formProfile: IFormProfile
  formForgotPassword: IformForgotPassword
  formResetPassword: IformResetPassword
  formRegister: IformRegister
  formLogin: IformLogin
  logout: Ilogout
  logoutUser: IlogoutUser
}
