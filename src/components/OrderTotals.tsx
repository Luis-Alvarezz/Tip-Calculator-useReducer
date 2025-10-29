import { useMemo } from "react"
import type { OrderItem } from "../types/types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void
}

export default function OrderTotals({order, tip, placeOrder}: OrderTotalsProps) {
  
  const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0 ), [order])
  // * useMemo nos simplifica el que se ejecute ese codigo cuando cambie la referencia y tambien evita tener ${subTotalAmount}

  const tipAmount = useMemo(() => subTotalAmount * tip , [tip, order]) // * Esta var se ejecuta solo cuando ciertas dependencias cambien
  // * Esta propina se tiene que ejecutar cuando dos cosas cambien: propina (subir o bajar) o cuando cambie el contenido de la orden

  const totalAmount = useMemo(() => subTotalAmount + tipAmount , [tip, order])
  
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propinas</h2>
        <p>Subtotal a pagar: {''}
          <span className="font-bold"> {formatCurrency(subTotalAmount)} </span>
        </p>

        <p>Propina: {''}
          <span className="font-bold"> {formatCurrency(tipAmount)} </span>
        </p>

        <p>Total a pagar: {''}
          <span className="font-bold"> {formatCurrency(totalAmount)} </span>
        </p>
      </div>

      <button 
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-25"
        disabled={totalAmount === 0}
        onClick={placeOrder}
        >
        Guardar Orden
      </button>
    </>
  )
}
