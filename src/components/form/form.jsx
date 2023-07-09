import formStyle from "./form.module.css";
import propTypes from "prop-types";

export function Form(props) {
  return (
    <div className={formStyle.container}>
      <h3 className="text text_type_main-medium">{props.heading}</h3>
      {props.children}
    </div>
  );
}

Form.propTypes = {
  heading: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  children: propTypes.array.isRequired,
};
