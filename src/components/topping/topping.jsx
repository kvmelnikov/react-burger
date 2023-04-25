import { useMemo, useRef } from 'react';
import toppingStyles from './topping.module.css';
import { useDrag, useDrop } from "react-dnd";
import {  useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


import { INSERT_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/burger-action';
import { DECREASE_COUNTER_INGREDIENT } from '../../services/actions/ingridients-action';
import { DELETE_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/burger-action';

export default function Topping({index, item}) {
  const dispatch = useDispatch();

  const {index2} = item;
  const dragRef = useRef(null);

  const [, drag] = useDrag({
    type: "item",
    item: {index2 ,index},
});

const [, drop] = useDrop({
  accept: 'item',
  hover(item) {
    if (!dragRef.current) {
      return;
    }
    const dragElIndex = item.index;
    const hoverElIndex = index;
   
    dispatch({type: INSERT_INGREDIENT_IN_CONSTRUCTOR, dragIndex: dragElIndex, hoverIndex:hoverElIndex })
    item.index = hoverElIndex;

  },
});

drag(drop(dragRef));

const handleDeleteTopping = (e, index) => {
  if(e.target.parentElement.parentElement.classList.contains('pr-2')) {
    dispatch({type: DECREASE_COUNTER_INGREDIENT, id:item._id})
    dispatch({type: DELETE_INGREDIENT_IN_CONSTRUCTOR, indx: index})    
  }
}


const content = useMemo (()=>{
    return ( <li ref={dragRef}  onClick={(e) => handleDeleteTopping(e,index)} className={`${toppingStyles.topping__item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
              text={item.name}
              price={item.price}s
            thumbnail={item.image}
/>
</li>)

  }
,[item])

return content
}