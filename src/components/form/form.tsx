import formStyle from "./form.module.css";
import propTypes from "prop-types";
import { FC } from 'react'

interface IForm {
  heading: string
  children?: JSX.Element|JSX.Element[];
} 

export  const  Form:FC<IForm> = (props) => {
  return (
    <div className={formStyle.container}>
      <h3 className="text text_type_main-medium">{props.heading}</h3>
      {props.children}
    </div>
  );
}

