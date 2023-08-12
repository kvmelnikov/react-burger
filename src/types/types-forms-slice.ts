
interface IInputsFormForgotPassword {
    email: { value: string }
 }
 
 interface IInputsFormLogin extends IInputsFormForgotPassword {
     password: { value: string }
 
 }
 
 interface IInputsFormResetPassword {
     pass: { value: string }
     token: { value: string }
 }
 
 export interface IInputsFormProfile extends IInputsFormLogin {
     [name: string]: { value: string }
 }
 
 interface Ilogout {
   request: boolean
   failed: boolean
 }
 
 interface IFormProfile extends Ilogout {
   inputs: IInputsFormProfile
 
 }
 
 interface IformForgotPassword extends Ilogout {
   inputs: IInputsFormForgotPassword
   redirect: boolean
 }
 
 interface IformResetPassword  extends Ilogout{
   inputs: IInputsFormResetPassword
 
 }
  
 interface IformRegister  extends Ilogout {
   inputs: IInputsFormProfile
 
 }
 
 interface IformLogin extends Ilogout {
   inputs: IInputsFormLogin
 
 }
 
 
 
 export interface IFormsState {
   formProfile : IFormProfile
   formForgotPassword:  IformForgotPassword
   formResetPassword: IformResetPassword
   formRegister: IformRegister
   formLogin: IformLogin
   logout: Ilogout
 }
 