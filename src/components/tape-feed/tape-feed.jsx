import { FeedElement } from '../feed-element/feed-element';
import TapeFeedStyle from './tape-feed.module.css';
import propTypes from 'prop-types';
import { useEffect } from 'react';
import { GET_IMAGES } from '../../services/actions/ingridients-action';
import { useDispatch } from 'react-redux';

export function TapeFeed({ feeds }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h2
        className={`${TapeFeedStyle.heading} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </h2>
      <ul className={`${TapeFeedStyle.list}`}>
        {feeds.map((feedElement) => {
          return (
            <li key={feedElement._id}>
              <FeedElement {...feedElement} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

TapeFeed.propTypes = {
  feeds: propTypes.array,
};
