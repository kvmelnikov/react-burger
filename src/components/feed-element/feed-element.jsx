import FeedElementStyle from './feed-element.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export function FeedElement({ images, createdAt, number, name, totalPrice, id }) {
  let location = useLocation()
  const length = images.length
  return (
    <Link className={FeedElementStyle.link} to={{ pathname: `/feed/${id}` }} state={{ background: location }}>
      <div className={`${FeedElementStyle.box} mb-4`}>
        <div className={`${FeedElementStyle.line} mt-6`}>
          <span className='text text_type_digits-default'>#{number}</span>
          <FormattedDate className={`text text_type_main-small text_color_inactive`} date={new Date(createdAt)} />
        </div>
        <p className={`${FeedElementStyle.line} mt-6 text text_type_main-medium`}>{name}</p>
        <div className={`${FeedElementStyle.line} mt-6 mb-6`}>
          <ul className={`${FeedElementStyle.list}`}>
            {images.slice(0, 6).map((image, index) => {
              return (
                <li
                  className={FeedElementStyle.list_item}
                  style={{ zIndex: index, position: index === 5 ? 'absolute' : '' }}
                  key={uuidv4()}
                >
                  <img
                    style={{ left: index * 50 }}
                    className={`${FeedElementStyle.image}`}
                    src={image.src}
                    alt={image.alt}
                  />
                </li>
              )
            })}
            {length > 6 ? (
              <li className={FeedElementStyle.list_item} style={{ zIndex: length }}>
                <span style={{ left: 250 }} className={`${FeedElementStyle.cover_image}`}>{`+${length - 6}`}</span>
              </li>
            ) : null}
          </ul>
          <div className={`${FeedElementStyle.price}`}>
            <span className='text text_type_digits-default mr-2'>{totalPrice}</span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  )
}
