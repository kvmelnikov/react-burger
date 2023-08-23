import { FeedElement } from '../feed-element/feed-element'
import TapeFeedStyle from './tape-feed.module.css'

import propTypes from 'prop-types'
import { Children, FC, useEffect, useMemo } from 'react'
import { GET_IMAGES } from '../../services/actions/ingridients-action'
import { useDispatch, useSelector } from 'react-redux'
import { useAppSelector } from '../../utils/hooks/hook'
import { IOrrder } from '../../services/feed/feed-slice'
import { IIngredientDetails } from '../../types/types'

interface ITapeFeedProps {
  feeds: IOrrder[]
  children: React.ReactNode
}

type TImage = {
  src: string
  alt: string
}

type TImageAndPrice = {
  images: TImage[]
  price: number
}

export const TapeFeed: FC<ITapeFeedProps> = ({ feeds, children }) => {
  // let imagesAndPrice = []
  const ingredients = useAppSelector((state) => state.ingredients.ingredients)

  const getImagesAndTotalPrice = (ingredients: IIngredientDetails[], idsOrder: string[]): TImageAndPrice => {
    const images: TImage[] = []
    let totalPrice = 0
    idsOrder.forEach((el) => {
      ingredients.forEach((ingr) => {
        if (ingr._id === el) {
          images.push({ src: ingr.image_mobile, alt: ingr.name })
          totalPrice += ingr.price
        }
      })
    })
    return { images: images, price: totalPrice }
  }

  return (
    <div>
      {children}
      <ul className={`${TapeFeedStyle.list}`}>
        {feeds.map((feedElement: IOrrder) => {
          const imagesAndPrice = getImagesAndTotalPrice(ingredients, feedElement.ingredients)
          return (
            <li key={feedElement._id}>
              <FeedElement
                totalPrice={imagesAndPrice.price}
                name={feedElement.name}
                number={feedElement.number}
                createdAt={feedElement.createdAt}
                images={imagesAndPrice.images}
                id={feedElement._id}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
