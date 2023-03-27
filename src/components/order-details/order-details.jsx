import orderDetailsStyles from "./order-details.module.css"
import propTypes from "prop-types";


function OrderDetails({numberOrder}) {
  return (
    <div className={orderDetailsStyles.container}>
      <p className="text text_type_digits-large mt-15">{numberOrder}</p>
      <p className="text text_type_main-medium mt-8 mb-15">
      идентификатор заказа
      </p>
      <img src={require('../../images/done.png')} alt="галочка" /> 
      <p className="text text_type_main-small mt-15">
      Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
      Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}


OrderDetails.propTypes = {
  numberOrder: propTypes.number.isRequired,
};


export default OrderDetails;

