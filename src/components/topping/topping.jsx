import { useMemo, useRef } from 'react';
import toppingStyles from './topping.module.css';
import { useDrag, useDrop } from "react-dnd";
import {  useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {

  movieTopping,
  deleteTopping,
} from "../../services/actions";


export default function Topping({index, item}) {
  const dispatch = useDispatch();

  const {key} = item;
  const dragRef = useRef(null);

  const [, drag] = useDrag({
    type: "item",
    item: {key,index},

});

const [, drop] = useDrop({
  accept: 'item',
  hover(item) {
    if (!dragRef.current) {
      return;
    }
    const dragEl = item.index;
    const hoverElIndex = index;
   
    dispatch(movieTopping(dragEl, hoverElIndex));
    item.index = hoverElIndex;
  },
});

drag(drop(dragRef));

const handleDeleteTopping = (e, index) => {
  if(e.target.parentElement.parentElement.classList.contains('pr-2')) {
    dispatch(deleteTopping(item._id, index))
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