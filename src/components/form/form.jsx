import formStyle from './form.module.css'

export function Form(props) {
  return (
    <div className={formStyle.container}>
        <h3 className='text text_type_main-medium'>{props.heading}</h3>
        {props.children}
    </div>
  )  
}