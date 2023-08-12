// import { FeedElement } from '../feed-element/feed-element'
// import TapeFeedStyle from './tape-feed.module.css'

// import propTypes from 'prop-types'
// import { Children, useEffect, useMemo } from 'react'
// import { GET_IMAGES } from '../../services/actions/ingridients-action'
// import { useDispatch, useSelector } from 'react-redux'

// export function TapeFeed({ feeds, children }) {
//   let imagesAndPrice = []
//  // console.log(feeds, children)
//   const getImagesAndTotalPrice = (ingredients, idsOrder) => {
//     const images = []
//     let totalPrice = 0
//     idsOrder.forEach((el) => {
//       ingredients.forEach((ingr) => {
//         if (ingr._id === el) {
//           images.push({ src: ingr.image_mobile, alt: ingr.name })
//           totalPrice += ingr.price
//         }
//       })
//     })
//     return [images, totalPrice]
//   }

//   const ingredients = useSelector((state) => state.ingredients.ingridients)

//   return (
//     <div>
//       {children}
//       <ul className={`${TapeFeedStyle.list}`}>
//         {feeds.map((feedElement) => {
//           imagesAndPrice = getImagesAndTotalPrice(ingredients, feedElement.ingredients)
//           return (
//             <li key={feedElement._id}>
//               <FeedElement
//                 totalPrice={imagesAndPrice[1]}
//                 name={feedElement.name}
//                 number={feedElement.number}
//                 createdAt={feedElement.createdAt}
//                 images={imagesAndPrice[0]}
//                 id={feedElement._id}
//               />
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }

// TapeFeed.propTypes = {
//   feeds: propTypes.array,
// }
