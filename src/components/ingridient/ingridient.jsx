import React from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyle from './ingridient.module.css';
import propTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const { ingridients__ingridient, ingridients__icon, ingridients__text, link } =
  ingridientStyle;

export default function Ingridient(props) {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingridient',
    item: [props],
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  let location = useLocation();
  return (
    <Link
      className={`${link}`}
      ref={dragRef}
      to={{
        pathname: `/ingredients/${props._id}`,
      }}
      state={{ background: location }}
    >
      <li
        onClick={() => props.handleOpenModal(props)}
        className={`${ingridients__ingridient}`}
      >
        {props.count > 0 ? (
          <Counter count={props.count} size="default" extraClass="m-1" />
        ) : (
          ''
        )}
        <img src={props.image} alt={props.name} />
        <div className={`${ingridients__icon} mb-2`}>
          <span className={`text text_type_main-medium mr-2`}>20</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${ingridients__text}`}>
          {props.name}
        </p>
      </li>
    </Link>
  );
}

Ingridient.propTypes = {
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
