import type { MenuItem, OrderItem } from '../types/types'

// ! 1.- Métodos o Acciones para lista de compras
export type OrderActions = 
{ type: 'addItem', payload:  {item: MenuItem } } |
{ type: 'removeItem', payload: {item: MenuItem['id']}} |
{ type: 'placeOrder'} |
{ type: 'add-tip', payload: { value: number }}

// ! 3.- STATE INICIAL para el Menu
export const initialState: OrderState = {
  // * Tomados de los STATES Iniciales -> const [order, setOrder] = useState<OrderItem[]>([]) Y const [tip, setTip] = useState(0)
  order: [],
  tip: 0
}

// ! 2.- STATES
export type OrderState = {
  // * De que tipo son los STATES
  order: OrderItem[],
  tip: number
}

// ! 4.- REDUCER
export const orderReducer = (state: OrderState = initialState, action: OrderActions ) => {
  if (action.type === 'addItem') {
    const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id) // * Retorna si encontro o no elemento pero NO dice que elemento es
    // * Por como funciona la MUTABILIDAD en React, NO podemos modificarlo directamtente como en Vue.js
    let updatedOrder : OrderItem[] = []
    if (itemExist) {
      // console.log('Ya existe');
      // * 1.- Identificar el Elemento
      updatedOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ?  {...orderItem, quantity: orderItem.quantity + 1  } : orderItem)
      // * 2.- ({...orderItem, quantity: orderItem.quantity + 1  }) -> Conocer que elemento es el duplicado para Tomar que cantidad ya hay e irla incrementado siempre manteniendo objetos que NO se muten directamente
      // setOrder(updatedOrder)
    } else {
      const newItem : OrderItem = {...action.payload.item, quantity: 1} // * CASTEO para asegurarnos de mantener el TYPE 
      // setOrder([...order, newItem])
      updatedOrder = [...state.order, newItem]
    }
    return {
      ...state,
      order: updatedOrder
    }
  }

  if (action.type === 'removeItem') {
    // console.log('Eliminando Item...')
    const itemsRestantes = state.order.filter(item => item.id !== action.payload.item)
    return {
      ...state,
      order: itemsRestantes
    }
  }

  if (action.type === 'placeOrder') {
    // console.log('Guardando Orden de consumo...')

    return {
      ...state,
      order: [],
      tip: 0
    }
  }

  if (action.type === 'add-tip') {
    // * UseReducer no tiene forma de modificar directamente el STATE
    const tip = action.payload.value
    return {
     ...state,
     tip: tip
    }
  }

  return state;
}