import { useDispatch, useSelector } from 'react-redux';
import FeedElementStyle from './feed-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { GET_IMAGES } from '../../services/actions/ingridients-action';
export function FeedElement(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_IMAGES, payload: props.ingredients });
  }, []);

  const images = useSelector((state) => state.ingredients.images);
  console.log(images);
  return (
    <div className={`${FeedElementStyle.box} mb-4`}>
      <div className={`${FeedElementStyle.line} mt-6`}>
        <span className="text text_type_digits-default">#{}</span>
        <span className="text text_type_main-small text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <p className={`${FeedElementStyle.line} mt-6 text text_type_main-medium`}>
        Death Star Starship Main бургер
      </p>
      <div className={`${FeedElementStyle.line} mt-6 mb-6`}>
        {images.map((img) => {
          return <img src={img} />;
        })}
        <div className={`${FeedElementStyle.price}`}>
          <span className="text text_type_digits-default">50</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
