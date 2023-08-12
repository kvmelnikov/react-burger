
import { Draft, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { stat } from "fs";
import { Writable } from "stream";
import { IFormsState } from "../../types/types-forms-slice";


type TUser = {
  name: string
} 




export const getUserRequest = createAsyncThunk<TUser, undefined, {rejectValue: string}>(
'forms/getUserRequest',
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              authorization: `${localStorage.getItem('accessToken')}`,
            },
          })
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }

}
);



export const initialState: IFormsState  = {
    formProfile: {
      inputs: {
        email: { value: "" },
        name: { value: "" },
        pass: { value: "" }
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
        pass: { value: "" },
        token: { value: "" },
      },
      request: false,
      failed: false,
    },
    formRegister: {
      inputs: {
        email: { value: "" },
        pass: { value: "" },
        name: { value: "" },
      },
      request: false,
      failed: false,
    },
    formLogin: {
      inputs: {
        email: { value: "" },
        pass: { value: "" },
      },
      request: false,
      failed: false,
    },
    logout: {
      request: false,
      failed: false,
    },
  }

 interface IFormDict {
    field: string
    value: string
    form: string
}  

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
              setFormValueRegister: (state, action: PayloadAction<IFormDict>) =>{
              type ObjectKey = keyof typeof state.formRegister.inputs;
              const field =  action.payload.field  as ObjectKey;
              if(state.formRegister.inputs[field]) {
                state.formRegister.inputs[field].value = action.payload.value
              }
               
        },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getUserRequest.pending, (state)=>{
        state.formProfile.request = true;
      }).addCase(getUserRequest.fulfilled, (state, action)=>{
        state.formProfile.inputs.name.value = action.payload.name
      }).addCase(getUserRequest.rejected, (state, action)=>{
        console.log(action.payload)
        state.formProfile.failed = true;
      })

      }
      
    })

        // getUserRequest: (state) => {
        //   return state
        // },
        // setProfileForm: (state, action: PayloadAction<string>)=>{
        //   state.formProfile.inputs.email.value= action.payload
        //   state.formProfile.inputs.name.value= action.payload
        //   state.formProfile.inputs.email.value= ""
        //   return state
        // },
        // profileRequestSubmitSuccess: (state) => {
        //   state.formProfile.request = false
        //   state.formProfile.failed = false
        //   return state
        // }

        // getIngredients: (state, action: PayloadAction<string>) => {
        //     return state
        // },
        // getIngredientsRequest: (state) => {
        //     state.ingredients_request = true
        //     return state
        // },

    

export const { setFormValueRegister } = formsSlice.actions
export default formsSlice.reducer