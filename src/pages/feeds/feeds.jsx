import { TapeFeed } from '../../components/tape-feed/tape-feed';
import { ReportFeeds } from '../../components/report-feeds/report-feeds';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnect } from '../../services/feed/feed-slice';
import { useEffect } from 'react';
export const LIVE_TABLE_SERVER_URL =
  'wss://norma.nomoreparties.space/orders/all';

export function Feeds() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnect(LIVE_TABLE_SERVER_URL));
  }, []);

  //const disconnect = () => dispatch(disconnectLiveTable());

  return (
    <>
      <TapeFeed />
      <ReportFeeds />
    </>
  );
}
