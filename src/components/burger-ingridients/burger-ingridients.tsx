import React, { RefObject, useMemo } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css'
//import IngridientDetails from '../ingredient-details/ingredient-details.jsx'
import Modal from '../modal/modal'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../utils/hooks/hook'
import { Ingredient } from '../ingridient/ingredient'

const { ingridients__container, ingridients__list, ingridients__tab } = burgerIngridientsStyle

interface TypesTopping {
  [key: string]: string
}

function BurgerIngridients() {
  const dispatch = useDispatch()
  const [current, setCurrent] = React.useState<string>('bun')

  const [types] = React.useState<TypesTopping>({
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  })
  const ingredients = useAppSelector((state) => state.ingredients.ingredients)

  // const ingredientDataForModal = useSelector((state) => state.ingredients.currentIngridient)
  // const showModal`IngridientDetails` = useSelector((state) => state.modal.modalIngridientDetail)

  const typeRefs = React.useRef<null | any[]>([])
  const containerRef = React.useRef<null | any>(null)

  typeRefs.current = Object.keys(types).map((_, i) =>
    typeRefs.current ? [i] ?? React.createRef<HTMLDivElement>() : null,
  )

  const calculateMinDistanceTypeToScroll = (scrollDistanceTop: number, currentType: string) => {
    let currentTab = currentType
    let minElement = 9999999

    typeRefs.current?.forEach((el) => {
      const elementDistanceTop = el.current.offsetTop
      const currentDifference = scrollDistanceTop + 40 - elementDistanceTop
      if (currentDifference < minElement && currentDifference >= 0) {
        minElement = currentDifference
        currentTab = el.current.dataset.types
      }
    })
    return currentTab
  }

  const handleScroll = React.useCallback(() => {
    const scrollDistanceTop = containerRef.current?.scrollTop
    setCurrent(calculateMinDistanceTypeToScroll(scrollDistanceTop, current))
  }, [types])

  const filterIngridients = (currentType: string) => {
    const filterIngridient = ingredients.filter((el) => el.type === currentType)
    return filterIngridient
  }

  const content = useMemo(() => {
    return (
      <section ref={containerRef} onScroll={handleScroll} className={`${ingridients__container}`}>
        {Object.keys(types).map((typed, index) => {
          return (
            <div key={typed} data-types={typed} ref={typeRefs.current ? typeRefs.current[index] : null}>
              <h3 className={`text text_type_main-medium mt-10 mb-4`}>{types[typed]}</h3>
              <ul className={`${ingridients__list}`}>
                {filterIngridients(typed).map((el) => {
                  return <Ingredient key={el._id} {...el} />
                })}
              </ul>
            </div>
          )
        })}
      </section>
    )
  }, [ingredients])

  return (
    <>
      <section className='mt-10'>
        <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
        <div className={`${ingridients__tab} mb-10`}>
          <Tab key={0} value='bun' active={current === 'bun'} onClick={() => setCurrent('bun')}>
            Булки
          </Tab>
          <Tab key={1} value='sauce' active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
            Соусы
          </Tab>
          <Tab key={2} value='main' active={current === 'main'} onClick={() => setCurrent('main')}>
            Начинки
          </Tab>
        </div>
        {content}
      </section>
    </>
  )
}

export default BurgerIngridients
