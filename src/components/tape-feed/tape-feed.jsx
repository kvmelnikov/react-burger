import { FeedElement } from '../feed-element/feed-element';

export function TapeFeed() {
  return (
    <div>
      <h2>Лента заказов</h2>
      <ul>
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
