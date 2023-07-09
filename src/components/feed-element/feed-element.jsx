import FeedElementStyle from './feed-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export function FeedElement() {
  return (
    <div className={`${FeedElementStyle.box} mb-4`}>
      <div className={`${FeedElementStyle.line} mt-6`}>
        <span className="text text_type_digits-default">#034535</span>
        <span className="text text_type_main-small text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <p className={`${FeedElementStyle.line} mt-6 text text_type_main-medium`}>
        Death Star Starship Main бургер
      </p>
      <div className={`${FeedElementStyle.line} mt-6 mb-6`}>
        <span>Картинки</span>
        <div className={`${FeedElementStyle.price}`}>
          <span className="text text_type_digits-default">50</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
