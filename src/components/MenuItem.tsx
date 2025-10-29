import type { OrderActions } from "../reducers/cal-prop-reducer";
import type { MenuItem } from "../types/types";

type MenuItemProps = {
  item: MenuItem,
  // addItem: (item: MenuItem) => void // * PROP (addItem) con TYPE de Arrow Funcion, es decir que recibe método 
  dispatch: React.Dispatch<OrderActions> // * PROP (dispatch) con TYPE de Arrow Funcion, es decir que recibe método 
}

export default function MenuItem({item, dispatch}: MenuItemProps) {
  return (
    <button className="border-2 border-teal-400 hover: bg-teal-200 w-full p-3 flex justify-between" onClick={() => dispatch({type: 'addItem', payload: {item: item} })}>
      <p>{item.name}</p>
      <p className="font-black">${item.price}</p>
    </button>
  )
}
