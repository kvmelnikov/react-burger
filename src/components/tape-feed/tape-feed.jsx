import { FeedElement } from '../feed-element/feed-element';
import TapeFeedStyle from './tape-feed.module.css';

export function TapeFeed() {
  return (
    <div>
      <h2
        className={`${TapeFeedStyle.heading} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </h2>
      <ul className={`${TapeFeedStyle.list}`}>
        <li>
          <FeedElement />
        </li>
        <li>
          {' '}
          <FeedElement />
        </li>
      </ul>
    </div>
  );
}
