import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Style from './feed-detail.module.css'
import { getDetailFeed } from '../../services/feed/feed-api-slice'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

export function FeedDetail() {
  const dispatch = useDispatch()
  const params = useParams()
  const feedDetail = useSelector((state) => state.feedApi.feedDetail)
  const feedDetailStrucure = useSelector((state) => state.feedApi.feedDetailStrucure)

  const status = useSelector((state) => state.feed.status)
  const feeds = useSelector((state) => state.feed.feeds)

  useEffect(() => {
    if (status === 'ONLINE' && feeds.length > 0) {
      dispatch(getDetailFeed(params.id))
    }
  }, [status, feeds])

  const checkStatusBurger = () => {
    if (feedDetail.status === 'done') {
      return 'Выполнен'
    } else {
      return 'Не выполнен'
    }
  }

  const content =
    Object.keys(feedDetail).length > 0 ? (
      <div className={`${Style.container}`}>
        <span className={`${Style.number} mb-10 text text_type_digits-default`}>#{feedDetail.number}</span>
        <p className={`${Style.line} mb-3 text text_type_main-medium`}>{feedDetail.name}</p>
        <span className={`${Style.line} mb-15 text text_type_main-default`}>{checkStatusBurger()}</span>
        <span className={`${Style.line} mb-6 text text_type_main-medium`}>Состав:</span>
        <ul className={`${Style.list}`}>
          {feedDetailStrucure.ingredients.map((el) => {
            return (
              <li className={`${Style.list_element} mb-4`}>
                <div className={`${Style.image_name}`}>
                  <img className={`${Style.image_ingredient}`} src={el.image} alt={el.name} />
                  <p className={`${Style.name_ingredient} ml-4 text text_type_main-default`}>{el.name}</p>
                </div>
                <div className={`${Style.currency} ml-4 mr-6`}>
                  <span className={`${Style.currency_text} mr-2 text text_type_digits-default`}>
                    {el.quantity}x{el.price}
                  </span>
                  <CurrencyIcon className={`${Style.currency_icon}`} type='primary' />
                </div>
              </li>
            )
          })}
        </ul>
        <div className={`${Style.total} mt-10`}>
          <FormattedDate
            className={`text text_type_main-small text_color_inactive`}
            date={new Date(feedDetail.createdAt)}
          />
          <div className={`${Style.currency}`}>
            <p className={`text text_type_digits-default mr-2`}>{feedDetailStrucure.sumIngredients}</p>
            <CurrencyIcon className={`${Style.currency_icon}`} type='primary' />
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )

  // const content = useMemo(() => {
  //   if (feedDetailRequest) {
  //     return <div>Загрузка</div>
  //   } else if (feeDetailFailed) {
  //     return <div>Ошибка</div>
  //   } else if (feedDetail) {
  //     return <div></div>
  //   }
  // }, [])

  return content
}
